# AnkiFFVL - QCM de révision FFVL

Application de révision des questions du QCM de la Fédération Française de Vol Libre (FFVL) utilisant la méthode de répétition espacée (style Anki).

## Fonctionnalités

- **777 questions** issues du QCM officiel FFVL (parapente uniquement)
- **Thèmes colorés** par niveau de brevet
- **Score journalier** : pourcentage de réussite de la session du jour
- **Objectif 75%** : seuil de réussite visualisé sur le graphique (15/20)
- **Répétition espacée** : les questions sont reproposées selon votre niveau de maîtrise
- **Profil et statistiques** : graphique d'évolution, historique, meilleure série
- **PWA** : installable sur mobile comme une application native
- **Multi-utilisateurs** : chaque utilisateur a sa propre progression

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

## Référence au Manuel du Vol Libre

Certaines questions incluent une référence au **Manuel du Vol Libre** de Pierre-Paul Ménégoz et Alain Jacques. Après avoir répondu, un lien vers la page correspondante s'affiche.

## Fichiers

- `index.html` : Application principale (HTML/CSS/JS)
- `questions.js` : Base de données des 777 questions
- `manifest.json` : Configuration PWA
- `icon-192.svg` : Icône de l'application
- `Manuel-FFVL.pdf` : Manuel du Vol Libre (optionnel)

## Stockage

Données stockées dans le `localStorage` du navigateur :
- `ankiffvl_user` : utilisateur connecté
- `ankiffvl_level` : niveau de brevet
- `ankiffvl_progress_{user}` : progression (répétition espacée)
- `ankiffvl_stats_{user}` : statistiques et historique

## Source des questions

Questions issues du dépôt [qcmffvl](https://github.com/jruffet/qcmffvl) de @jruffet.

## Licence

Questions FFVL - Usage éducatif.
