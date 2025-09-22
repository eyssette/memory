# Changelog

## 3.1.0 (2025-09-22)

### Feat

- gestion de l'en-tête YAML - styles personnalisés CSS et gestion des mathématiques

## 3.0.1 (2025-09-22)

### Fix

- ajout de la partie "Contribuer" dans le README"

### Chore

- modularisation de "handleDefaultContent"
- commentaire pour indiquer la source première du Memory Game
- rulesReminder dans le fichier const.mjs
- modularisation plus avancée de "editor.mjs" et résolution du problème de circularité des dépendances
- modularisation de editor.mjs
-  organisation du dossier "js"
- dossiers "css" et "js" dans le dossier "src"
- déplacement du dossier "lib" dans "src"

## 3.0.0 (2025-09-22)

### Fix

- pas d'éditeur en ligne pour les petits écrans

### Refactor

- réécriture en modules et compilation avec Rollup

## 2.0.0 (2025-09-21)

### Feat

- ajout d'un éditeur en ligne
- ajout d'un champ de redirection vers un Markdown en ligne

### Chore

- Application renommée MemoryMD
- précision sur les combinaisons possibles (texte, image, son)
- explications dans le README pour les fichiers audio

## 1.3.0 (2025-09-21)

### Feat

- gestion des éléments audio

### Fix

- arrêt du son d'une carte si on clique sur une nouvelle

## 1.2.1 (2025-09-21)

### Fix

- CSS pour le titre et le blockquote

## 1.2.0 (2025-09-21)

### Feat

- possibilité d'ajouter un titre (avec un titre de niveau 1) et une consigne (avec un blockquote)

### Fix

- meilleur affichage (sur petit écran, et sur plus grand écran)
- ouverture des liens dans un autre onglet

## 1.1.2 (2025-09-21)

### Fix

- position top du footer exprimée en vh plutôt qu'en px
- ajout favicon et attributs meta

### Chore

- réorganisation et création dossier "src" pour fichiers JS et CSS

## 1.1.1 (2025-09-21)

### Fix

- CSS pour les liens dans le footer

### Chore

- mise en place du CHANGELOG et du bump automatique avec commitizen

## 1.1.0 (2025-09-21)

### Feat

- feat: contenu des cartes en Markdown
- feat: récupération de la source MD à partir d'une URL dans le hash
- feat: source des cartes en Markdown
- feat: intégration du README.md dans la page d'accueil par défaut
- feat: possibilité d'avoir 2 cartes, que l'on doit associer, avec le même id, mais un contenu différent
- feat: ajustement automatique de la police du texte avec textFit

### Fix

- fix: CSS pour la version à imprimer
- fix: exemples d'associations
- fix: z-index élevé pour l'overlay

### Chore, perf, refactor

- chore: formatage JS et CSS
- chore: description de l'application dans le fichier README.md
- chore: configuration de Task pour le build
- chore: formatage automatique JS et CSS
- perf: contenu par défaut - images en local et optimisées
- refactor: fragments de cartes HTML réécrits avec des template literals
- chore: suppression de card.name qui est inutile
- perf: minification JS & CSS

## 1.0.0 (2025-09-20)

- feat: base de jeu Memory
- Initial commit
