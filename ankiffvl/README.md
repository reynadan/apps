# AnkiFFVL - QCM de révision FFVL

Application de révision des questions du QCM de la Fédération Française de Vol Libre (FFVL) utilisant la méthode de répétition espacée (style Anki).

## Fonctionnalités

- **857 questions** issues du QCM officiel FFVL
- **Sélection par niveau de brevet** : révisez uniquement les questions de votre niveau
- **Explications pédagogiques** après chaque réponse pour mieux comprendre
- **Répétition espacée** : les questions sont reproposées selon votre niveau de maîtrise
- **Progression sauvegardée** localement dans le navigateur
- **Multi-utilisateurs** : chaque utilisateur a sa propre progression

## Niveaux de brevet

| Niveau | Couleur | Questions |
|--------|---------|-----------|
| Brevet Initial | Vert (V) | 189 |
| Brevet de Pilote | Bleu (B) | 370 |
| Brevet de Pilote Confirmé | Marron (M) | 221 |
| Qualification Treuil | (T) | 77 |
| **Total** | | **857** |

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
- **Mauvaise réponse** : la question redescend au niveau 1 (reproposée rapidement)

### Quand une question est-elle considérée apprise ?

Une question est considérée **apprise** lorsqu'elle atteint le niveau 8. Cela nécessite :
- **8 bonnes réponses consécutives** sur des intervalles progressifs
- Un délai total d'environ **25 jours** de révisions réussies (1min + 10min + 1h + 1j + 3j + 7j + 14j)

Une seule erreur ramène la question au niveau 1, obligeant à recommencer le cycle complet.

## Utilisation

1. Ouvrir `index.html` dans un navigateur
2. Entrer votre nom ou pseudo
3. Sélectionner votre niveau de brevet (Vert, Bleu, Marron, Treuil ou Toutes)
4. Cliquer sur "Commencer"
5. Cocher les bonnes réponses et valider

## Filtres disponibles

- **À réviser** : questions dues + nouvelles
- **Nouvelles** : questions jamais vues
- **Toutes** : toutes les questions

## Référence au Manuel du Vol Libre

Certaines questions incluent une référence au **Manuel du Vol Libre** de Pierre-Paul Ménégoz et Alain Jacques. Après avoir répondu à une question, un lien vers la page correspondante du manuel s'affiche pour approfondir le sujet.

Pour ajouter une référence à une question, ajouter le champ `manualPage` dans `questions.js` :
```javascript
{
    "id": "E10B",
    "text": "La portance d'une aile est due à :",
    "explanation": "...",
    "manualPage": 28,  // ← Référence à la page 28 du manuel
    "answers": [...]
}
```

## Fichiers

- `index.html` : Application principale
- `questions.js` : Base de données des questions (générée depuis le CSV)
- `qcm_ffvl.csv` : Fichier source des questions
- `Manuel-FFVL.pdf` : Manuel du Vol Libre FFVL (optionnel, pour les références)

## Source des questions

Les questions proviennent du dépôt [qcmffvl](https://github.com/jruffet/qcmffvl) de @jruffet.

## Stockage

Les données sont stockées dans le `localStorage` du navigateur :
- `ankiffvl_user` : nom de l'utilisateur connecté
- `ankiffvl_level` : niveau de brevet sélectionné
- `ankiffvl_progress_{username}` : progression de chaque utilisateur

## Licence

Questions FFVL - Usage éducatif.
