# AnkiFFVL - QCM de révision FFVL

Application de révision des questions du QCM de la Fédération Française de Vol Libre (FFVL) utilisant la méthode de répétition espacée (style Anki).

## Fonctionnalités

- **777 questions** issues du QCM officiel FFVL (parapente uniquement)
- **Thèmes colorés** par niveau de brevet (vert, bleu, marron, gris, violet)
- **Score journalier** : pourcentage de réussite de la session du jour
- **Objectif 75%** : seuil de réussite visualisé sur le graphique (15/20)
- **Répétition espacée** : les questions sont reproposées selon votre niveau de maîtrise
- **Diagrammes explicatifs** : schémas SVG pour illustrer les concepts clés
- **Profil et statistiques** : graphique d'évolution, historique, meilleure série
- **Animations** : confettis sur bonne réponse, shake sur erreur
- **PWA** : installable sur mobile comme une application native
- **Multi-utilisateurs** : chaque utilisateur a sa propre progression
- **Hors-ligne** : fonctionne sans connexion internet

## Niveaux de brevet

| Niveau | Couleur | Questions | Seuil examen |
|--------|---------|-----------|--------------|
| Brevet Initial | Vert (V) | 162 | 135/180 pts (75%) |
| Brevet de Pilote | Bleu (B) | 325 | 270/360 pts (75%) |
| Brevet Confirmé | Marron (M) | 214 | 135/180 pts (75%) |
| Qualification Treuil | Gris (T) | 76 | - |
| **Total** | | **777** | |

> Les questions spécifiques au delta (préfixes H, R, X) ont été retirées.

## Système de score

Le score affiché correspond à votre **pourcentage de réussite du jour** :

```
Aujourd'hui : 22 bonnes sur 33 questions = 67%
```

- **Objectif** : atteindre 75% (équivalent 15/20 à l'examen)
- **Série** : nombre de bonnes réponses consécutives (bonus de motivation)
- **Graphique** : évolution jour par jour avec ligne verte à 75%

## Système de répétition espacée

Le système s'inspire de l'algorithme Anki :

| Niveau | Intervalle | Description |
|--------|------------|-------------|
| 0 | - | Nouvelle question |
| 1 | 1 min | Première révision |
| 2 | 10 min | |
| 3 | 1 heure | |
| 4 | 1 jour | |
| 5 | 3 jours | |
| 6 | 7 jours | |
| 7 | 14 jours | |
| 8 | 30 jours | Question apprise |

- **Bonne réponse** : la question monte d'un niveau
- **Mauvaise réponse** : la question redescend au niveau 1
- **Nouvelles questions** : apparaissent dans un ordre aléatoire

## Utilisation

1. Ouvrir `index.html` dans un navigateur (ou installer en PWA)
2. Entrer votre nom ou pseudo
3. Sélectionner votre niveau de brevet
4. Cliquer sur "Commencer"
5. Cocher les bonnes réponses et valider

### Profil

Cliquer sur la barre en haut à droite pour accéder au profil :
- Score du jour et série en cours
- Meilleure série et précision globale
- Graphique d'évolution (avec seuil 75%)
- Historique des 7 derniers jours
- Déconnexion

## Diagrammes explicatifs

31 questions incluent des schémas SVG pour illustrer les concepts clés :

| Diagramme | Description | Nb |
|-----------|-------------|:--:|
| `incidence` | Angles d'incidence, assiette et pente | 4 |
| `convection` | Convection thermique (thermiques, cumulus) | 4 |
| `nuages` | Classification des nuages par altitude | 4 |
| `facteurCharge` | Facteur de charge en virage | 4 |
| `vitesseVent` | Vitesse air vs vitesse sol avec vent | 4 |
| `finesse` | Rapport distance/hauteur perdue | 3 |
| `portanceTrainee` | Portance, traînée et RFA | 3 |
| `ressaut` | Onde de ressaut, rotors et lenticulaires | 2 |
| `allongement` | Envergure²/surface | 2 |
| `foehn` | Effet de foehn (versants au vent/sous le vent) | 0* |
| `transfertChaleur` | Rayonnement, conduction, convection | 1 |

*Le diagramme foehn est disponible mais pas encore lié à des questions.

Les diagrammes s'affichent automatiquement dans l'explication après la validation.

## Référence au Manuel du Vol Libre

Certaines questions incluent une référence au **Manuel du Vol Libre** de Pierre-Paul Ménégoz et Alain Jacques. Après avoir répondu, un lien vers la page correspondante s'affiche.

---

## Documentation technique

### Structure des fichiers

```
ankiffvl/
├── index.html          # Application principale (HTML/CSS/JS)
├── questions.js        # Base de données des 777 questions
├── manifest.json       # Configuration PWA
├── icon-192.svg        # Icône de l'application
├── Manuel-FFVL.pdf     # Manuel du Vol Libre (optionnel)
└── README.md           # Cette documentation
```

### Format des questions (questions.js)

```javascript
{
  "id": "E50V",                    // Identifiant unique (lettre = thème, chiffre = numéro, V/B/M/T = niveau)
  "text": "L'incidence est...",    // Énoncé de la question
  "explanation": "L'incidence...", // Explication affichée après validation
  "manualPage": 45,                // Page du Manuel FFVL (optionnel)
  "diagram": "incidence",          // Clé du diagramme à afficher (optionnel)
  "answers": [
    {
      "text": "L'angle entre...",  // Texte de la réponse
      "score": 6,                  // Points : positif = correct, négatif = incorrect
      "isCorrect": true            // Booléen de validation
    },
    // ...
  ]
}
```

### Thèmes des questions (préfixes)

| Préfixe | Thème |
|---------|-------|
| A | Aérologie / Météorologie |
| E | Mécanique de vol / Aérodynamique |
| M | Matériel |
| P | Pilotage |
| R | Réglementation |
| S | Sécurité / Facteurs humains |
| T | Treuil |
| U | Situations pratiques |

### Ajout d'un diagramme

1. Ajouter le SVG dans l'objet `DIAGRAMS` (index.html) :

```javascript
const DIAGRAMS = {
  monDiagramme: {
    title: "Titre du diagramme",
    svg: `<svg viewBox="0 0 400 200">...</svg>`
  }
};
```

2. Référencer dans les questions concernées (questions.js) :

```javascript
{
  "id": "XXX",
  "diagram": "monDiagramme",
  // ...
}
```

### Variables CSS (thèmes)

```css
body.theme-V { --primary: #2e7d32; }  /* Vert - Initial */
body.theme-B { --primary: #1565c0; }  /* Bleu - Pilote */
body.theme-M { --primary: #6d4c41; }  /* Marron - Confirmé */
body.theme-T { --primary: #546e7a; }  /* Gris - Treuil */
body.theme-ALL { --primary: #7b1fa2; } /* Violet - Toutes */
```

### Stockage (localStorage)

| Clé | Contenu |
|-----|---------|
| `ankiffvl_user` | Nom d'utilisateur connecté |
| `ankiffvl_level` | Niveau de brevet (V, B, M, T, ALL) |
| `ankiffvl_progress_{user}` | Progression par question (niveau, dates) |
| `ankiffvl_stats_{user}` | Statistiques (séries, historique journalier) |

### Structure de la progression

```javascript
{
  "E50V": {
    "level": 4,           // Niveau actuel (0-8)
    "nextReview": 1710..., // Timestamp prochaine révision
    "lastReview": 1710...  // Timestamp dernière révision
  }
}
```

### Structure des statistiques

```javascript
{
  "totalScore": 0,
  "currentStreak": 5,     // Série actuelle
  "bestStreak": 12,       // Meilleure série
  "totalCorrect": 150,    // Total bonnes réponses
  "totalAnswered": 200,   // Total réponses
  "history": [            // 30 derniers jours max
    { "date": "2024-01-15", "correct": 18, "total": 25 }
  ]
}
```

---

## Source des questions

Questions issues du dépôt [qcmffvl](https://github.com/jruffet/qcmffvl) de @jruffet.

## Licence

Questions FFVL - Usage éducatif.
