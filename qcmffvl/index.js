    let ALL_QUESTIONS = [];
    
    fetch('questions.json')
      .then(response => response.json())
      .then(data => {
        ALL_QUESTIONS = data;
        startGame(); // Lance le jeu une fois les questions chargées
      })
      .catch(error => {
        document.getElementById("game").innerHTML = "<b>Erreur de chargement des questions.</b>";
        console.error(error);
      });
    // --- Utilitaires ---
    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    // --- Algorithme de répétition espacée simple ---
    let errorStats = JSON.parse(localStorage.getItem("parapente_errors") || "{}");

    function getWeightedQuestions(all, n) {
      // Questions ratées = plus de chances d'être tirées
      let weighted = [];
      all.forEach(q => {
        const err = errorStats[q.question] || 0;
        for (let i = 0; i < 1 + Math.min(err, 3); i++) weighted.push(q);
      });
      return shuffle(weighted).slice(0, n);
    }

    // --- Jeu principal ---
    const NB_QUESTIONS = 20;
    const SCORE_OBJECTIF = 135;
    let questions, current, score, userAnswers, askedQuestions;

    function startGame() {
      questions = getWeightedQuestions(ALL_QUESTIONS, NB_QUESTIONS);
      current = 0;
      score = 0;
      userAnswers = [];
      askedQuestions = [];
      renderQuestion();
    }

    function renderQuestion() {
      const q = questions[current];
      askedQuestions.push(q.question);
      let html = `
        <div class="progress">Question ${current + 1} / ${NB_QUESTIONS}</div>
        <div class="score">Score : ${score} / ${NB_QUESTIONS * 6}</div>
        <div class="question">${q.question}</div>
        <form id="answerForm" class="answers">
      `;
      q.answers.forEach((a, i) => {
        html += `
          <button type="button" class="answer-btn" data-idx="${i}">${a.answer}</button>
        `;
      });
      html += `
        </form>
        <button class="next-btn" id="nextBtn" disabled>Valider</button>
      `;
      document.getElementById("game").innerHTML = html;

      // Sélection des réponses
      const btns = document.querySelectorAll(".answer-btn");
      let selected = [];
      btns.forEach(btn => {
        btn.addEventListener("click", () => {
          // Multi-sélection (QCM)
          const idx = +btn.dataset.idx;
          if (selected.includes(idx)) {
            selected = selected.filter(i => i !== idx);
            btn.classList.remove("selected");
          } else {
            selected.push(idx);
            btn.classList.add("selected");
          }
          document.getElementById("nextBtn").disabled = selected.length === 0;
        });
      });

      // Validation
      document.getElementById("nextBtn").onclick = () => {
        showFeedback(selected);
      };
    }

    function showFeedback(selected) {
      const q = questions[current];
      const correct = q.answers.map((a, i) => a.score > 0 ? i : null).filter(i => i !== null);
      let questionScore = 0;
      selected.forEach(i => {
        questionScore += q.answers[i].score;
      });
      score += questionScore;
      userAnswers.push({ selected, correct, questionScore, question: q.question });

      // Feedback visuel
      const btns = document.querySelectorAll(".answer-btn");
      btns.forEach((btn, i) => {
        btn.disabled = true;
        if (correct.includes(i)) btn.classList.add("correct");
        if (selected.includes(i) && !correct.includes(i)) btn.classList.add("incorrect");
      });

      // Feedback textuel
      let feedback = "";
      const isCorrect = JSON.stringify(selected.sort()) === JSON.stringify(correct.sort());
      if (isCorrect) {
        feedback = `<span style="color:green;">Bravo ! Bonne réponse.</span>`;
      } else {
        feedback = `<span style="color:#e67e22;">Mauvaise réponse.</span>`;
        // Statistiques erreurs
        errorStats[q.question] = (errorStats[q.question] || 0) + 1;
        localStorage.setItem("parapente_errors", JSON.stringify(errorStats));
        // Ajoute l'explication si elle existe
        if (q.explanation) {
          feedback += `<div style="margin-top:8px; color:#2a4d69; background:#eaf6ff; border-left:4px solid #2a4d69; padding:8px 12px; border-radius:4px;">
            <b>Explication :</b> ${q.explanation}
          </div>`;
        }
      }
      feedback += `<br>Score pour cette question : <b>${questionScore}</b>`;
      feedback += `<br>Bonne(s) réponse(s) :<ul>`;
      correct.forEach(i => {
        feedback += `<li>${q.answers[i].answer}</li>`;
      });
      feedback += `</ul>`;


      document.getElementById("game").querySelector(".feedback")?.remove();
      const feedbackDiv = document.createElement("div");
      feedbackDiv.className = "feedback";
      feedbackDiv.innerHTML = feedback;
      document.getElementById("game").appendChild(feedbackDiv);

      // Next ou fin
      const nextBtn = document.getElementById("nextBtn");
      nextBtn.disabled = false;
      nextBtn.textContent = (current < NB_QUESTIONS - 1) ? "Question suivante" : "Voir le résultat";
      nextBtn.onclick = () => {
        if (current < NB_QUESTIONS - 1) {
          current++;
          renderQuestion();
        } else {
          showSummary();
        }
      };
    }

    function showSummary() {
      // Statistiques erreurs
      userAnswers.forEach(ans => {
        if (JSON.stringify(ans.selected.sort()) !== JSON.stringify(ans.correct.sort())) {
          errorStats[ans.question] = (errorStats[ans.question] || 0) + 1;
        }
      });
      localStorage.setItem("parapente_errors", JSON.stringify(errorStats));

      let html = `<div class="summary"><h2>Partie terminée !</h2>
        <div class="score">Score final : <b>${score}</b> / ${NB_QUESTIONS * 6}</div>
        <div>${score >= SCORE_OBJECTIF ? "🎉 <b>Bravo, objectif atteint !</b>" : "Continue à t'entraîner !"}</div>
        <button class="retry-btn" onclick="startGame()">Rejouer</button>
        <h3>Questions à réviser :</h3>
        <ul class="stat-list">
      `;
      // Top 5 questions ratées
      const sorted = Object.entries(errorStats)
        .filter(([q, n]) => askedQuestions.includes(q))
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
      if (sorted.length === 0) {
        html += "<li>Tu n'as pas fait d'erreur sur cette partie !</li>";
      } else {
        sorted.forEach(([q, n]) => {
          html += `<li>${q} <span style="color:#888;">(${n} erreur${n>1?"s":""})</span></li>`;
        });
      }
      html += "</ul></div>";
      document.getElementById("game").innerHTML = html;
    }

    // --- Lancement du jeu ---
    startGame();
