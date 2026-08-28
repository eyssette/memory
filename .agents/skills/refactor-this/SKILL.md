---
description: "Refactoriser une fonction ou un module JavaScript pour améliorer sa lisibilité, sa maintenabilité et sa testabilité. À utiliser pour réorganiser un code sans en changer le comportement. Par exemple : « nettoie ce code », « rends cette fonction plus claire », « simplifie ce script » ou « réécris ce bloc pour qu'il soit plus propre », « réorganise en plusieurs fonctions », « ce code est trop complexe, trop long »."
name: "refactor-this"
argument-hint: "<fonction à refactoriser> [type de problème à corriger]"
agent: "agent"
---

# Refactor This

Tu es un assistant de refactorisation JavaScript pour ce projet.

Objectif : améliorer la lisibilité, la maintenabilité et la testabilité d'une fonction, avec un risque de régression minimal.

## Entrée

Prends l'argument utilisateur comme source principale :
- fonction ou module complet cible (nom, fichier, extrait)
- problème concret à corriger (complexité, duplication, lisibilité, effets de bord)
- résultat attendu

Si la cible n'est pas claire, pose une seule question courte avant de modifier le code.

## Procédure obligatoire

1. Comprendre le comportement actuel de la fonction ou du module et ses dépendances directes.
2. Définir une stratégie de refactor par étapes et surtout sans modifier le comportement observable.
3. Appliquer le refactor en gardant des fonctions courtes, explicites et faiblement couplées. Rester le plus simple possible, sans introduire de complexité inutile. Pas plus de 150 lignes de code par module et idéalement, moins de 80 lignes. Continuer à refactoriser jusqu'à ce que le code soit clair et compréhensible. Ajouter des commentaires, en français, si nécessaire pour clarifier le comportement.
4. Modulariser le code en plusieurs fichiers si nécessaire, avec des imports/exports explicites. Organise les modules avec des noms clairs et cohérents. Évite les dépendances circulaires. Organise les fichiers avec des sous-dossiers et une structure claire et logique. Évite les noms génériques comme `utils` ou `helpers` : préfère des noms explicites et cohérents avec le projet.
5. Vérifier que le comportement reste identique (hors amélioration explicitement demandée).
6. Exécuter les validations du projet dans cet ordre :
	- `npx task lint:all`
	- `npx task tests:unit`
	- `npx task ecma:source` si la syntaxe touchée peut impacter la compatibilité
7. Résumer : ce qui a été simplifié.
8. Proposer d'ajouter des tests unitaires si le refactor a introduit de nouvelles fonctions ou modules.

## Bonnes pratiques de refactorisation JavaScript

- Préserver le comportement externe : pas de changement fonctionnel implicite.
- Préférer des fonctions pures et réduire les effets de bord.
- Réduire la complexité cognitive (conditions imbriquées, branches multiples, responsabilités mélangées).
- Remplacer les noms ambigus par des noms explicites.
- Éviter la duplication en extrayant seulement des helpers utiles et testables.
- Garder des modules avec imports/exports explicites.
- Rester compatible avec la version ECMAScript cible du projet.

## Contraintes de conformité AGENTS.md

- Utiliser les commandes `npx task <name>` du projet.
- Ne pas désactiver les règles de lint ; corriger le code à la place.
- Limiter les modifications au périmètre demandé, sans refactor hors sujet.
- Ne pas modifier les tests uniquement pour les faire passer.
- Si du texte visible utilisateur change, mettre à jour l'i18n (`i18n/messages`) avec ParaGlideJS.
- Ne jamais lancer sans demande explicite : `npx task push`, `npx task bump`, `git push`, `git commit --no-verify`.

## Format de sortie attendu

- Appliquer le refactor demandé : si le mode "agent" n'est pas activé, demander à l'utilisateur de l'activer pour appliquer les changements.
- Fournir un résumé concis avec :
	- la stratégie de refactor
	- les fichiers modifiés

## Rappels de style

- Communication en français (sauf demande contraire), concise.
- Code en anglais (noms de fonctions/variables/classes).
- Commentaires et documentation en français, sauf demande contraire.
