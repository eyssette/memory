# MemoryMD

**MemoryMD** est une application libre et gratuite qui permet de créer des jeux d'association à partir d'un simple texte en Markdown.

Vous pouvez créer des jeux qui associent : du texte, des images ou du son. Toutes les combinaisons sont possibles : texte/texte, texte/image, texte/son, image/son, image/image, son/son.

## ⚙️ Fonctionnement

Pour utiliser l'application MemoryMD, vous devez créer un fichier Markdown avec la syntaxe suivante :

- On sépare chaque carte avec une ligne vide.
- Si vous voulez associer deux éléments, écrivez le premier élément sur une ligne, puis allez à la ligne pour écrire le deuxième élément : utilisez la syntaxe Markdown pour écrire votre texte ou insérer une image.
- Si une seule ligne est présente, au lieu d'associer deux éléments différents, la carte sera répétée deux fois et il s'agira alors de retrouver la carte identique.

Vous pouvez tester l'éditeur en ligne afin de comprendre comment cela fonctionne  <!--BUTTON_OPEN_EDITOR-->

Pour pouvoir partager votre Memory, il faut mettre votre contenu en Markdown dans un fichier en ligne (par exemple avec CodiMD).

Votre jeu Memory sera alors disponible à l'adresse suivante : `https://memorymd.forge.apps.education.fr/#URL_DU_FICHIER_MARKDOWN`

<!--INPUT_MARKDOWN-->

On peut ajouter un titre et/ou une consigne à son jeu de Memory.
- Pour le titre, on utilise un titre de niveau 1 en Markdown
- Pour la consigne, on utilise un bloc de citation

Vous pouvez aussi utiliser un fichier audio avec une ligne qui commence par `audio: ` suivie de l'URL de votre fichier.

## 👀 Exemples

- [Exemple basique](https://memorymd.forge.apps.education.fr/#https://codimd.apps.education.fr/5cw7PygxR72Obz8K8mRwew) pour comprendre la structure d'un Memory. [Voir la source](https://codimd.apps.education.fr/5cw7PygxR72Obz8K8mRwew) pour ensuite faire votre propre Memory.
- [Exemple de Memory avec des sons](http://memorymd.forge.apps.education.fr/#https://codimd.apps.education.fr/fk4QyJ7nSF6dHb1mHOzGag) et des associations texte / son et image / son. [Voir la source](https://codimd.apps.education.fr/fk4QyJ7nSF6dHb1mHOzGag)

## 🙋‍♀️ Contribuer

Merci de votre intérêt pour MemoryMD ! Toute contribution est appréciée !

- N'hésitez pas à faire une suggestion pour ajouter une fonctionnalité, ou à signaler un bug. Pour cela, vous pouvez utiliser les [tickets](https://forge.apps.education.fr/memorymd/memorymd.forge.apps.education.fr/-/issues/new) de l'application ou bien envoyer un [mail](forge-apps+guichet+memorymd-memorymd-forge-apps-education-fr-6780-issue-@phm.education.gouv.fr).
- Si vous souhaitez participer au code de MemoryMD, n'hésitez pas à consulter les tickets et à [contacter le responsable du projet](http://eyssette.forge.apps.education.fr/).

## 👩‍⚖️ Licence

MemoryMD est distribué sous licence MIT.

## 🙏 Crédits

MemoryMD a été écrit à partir du [Memory Game de Nate Wiley](https://codepen.io/natewiley/pen/BawOqL) sous License MIT.

Il a été réécrit sans jQuery et ajoute les fonctionnalités suivantes :
- source des cartes en Markdown, grâce à la librairie [marked.js](https://marked.js.org/)
- lecture d'un fichier externe en Markdown en mettant l'URL dans le hash
- ajustement automatique de la taille de la police dans chaque carte, avec la librairie [textFit](https://github.com/STRML/textFit/)
- possibilité d'utiliser du texte, une image ou un son dans une carte, avec toutes les associations possibles : texte / image, texte / son, image / son …