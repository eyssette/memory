# Contribuer à ce projet

Merci de vouloir contribuer !
Ce document explique simplement comment proposer des améliorations pour ce projet.

Avant tout, il est préférable de consulter le fichier [README.md](README.md) pour comprendre le projet et son fonctionnement.

N'hésitez pas à contacter les responsables du projet si vous avez des questions ou des propositions.

## Signaler un bug ou proposer une idée

Dans un ticket (issue), indiquer :

- le contexte
- si c'est un bug : les étapes pour reproduire
- le résultat attendu
- le résultat observé

Merci pour vos retours, ils sont précieux pour améliorer le projet !

## Contribuer au développement

### Prérequis

- Node.js >= 22
- npm >= 10 recommandé (>= 8 minimum)

VSCode/VSCodium est conseillé pour le développement (le projet est préconfiguré pour cet éditeur).

### Récupérer le projet et installer les dépendances

Créer un nouveau dossier en local et lancer les commandes suivantes dans un terminal :

```bash
git clone <url-du-projet> .
npm install
```

### Workflow recommandé

1. Créer une branche depuis `main`.
2. Développer dans `app/js` et `app/css`.
3. Lancer les vérifications en local (tests, lint, build).
4. Commiter avec la convention du projet.
5. Ouvrir une Merge Request claire et ciblée.

### Vérifications avant de proposer une MR

Lancer au minimum :

```bash
npx task format
npx task lint
npx task ecma:source
npx task tests
npx task build
```

Commandes utiles :

```bash
task security
task perf
task a11y
task coverage

```

### Commits

Le projet suit Conventional Commits.

Exemples :

- `feat(scope): description`
- `fix(scope): description`
- `docs: description`
- `chore: description`

Rappels :

- Le `scope` est obligatoire pour `feat` et `fix`.
- Utiliser `!` pour signaler une rupture de compatibilité.
- Les hooks Husky vérifient automatiquement le format et la qualité du code.

### Bonnes pratiques

- Faire des MR petites et faciles à relire.
- Ajouter ou mettre à jour les tests si le comportement change.
- Mettre à jour la documentation si nécessaire.
- Garder un code lisible et cohérent avec le style existant.

Merci pour votre contribution.
