# Memory

**Memory** est une application libre et gratuite qui permet de créer des jeux d'association à partir d'un simple texte en Markdown.

Vous pouvez créer des jeux de type texte/texte, texte/image, ou image/image.

## ⚙️ Fonctionnement
Pour utiliser l'application Memory, vous devez créer un fichier Markdown avec la syntaxe suivante :

- On sépare chaque carte avec une ligne vide.
- Si vous voulez associer deux éléments, écrivez le premier élément sur une ligne, puis allez à la ligne pour écrire le deuxième élément : utilisez la syntaxe Markdown pour écrire votre texte ou insérer une image.
- Si une seule ligne est présente, au lieu d'associer deux éléments différents, la carte sera répétée deux fois et il s'agira alors de retrouver la carte identique.

Ensuite, mettez l'URL de votre fichier Markdown dans le hash de l'URL de l'application :
`https://memory.forge.apps.education.fr/#URL_DU_FICHIER_MARKDOWN`

On peut ajouter un titre et/ou une consigne à son jeu de Memory.
- Pour le titre, on utilise un titre de niveau 1 en Markdown
- Pour la consigne, on utilise un bloc de citation

## 👀 Exemples

- [Exemple basique](https://memory.forge.apps.education.fr/#https://codimd.apps.education.fr/5cw7PygxR72Obz8K8mRwew) pour comprendre la structure d'un Memory. N'hésitez pas à [récupérer la source en Markdown](https://codimd.apps.education.fr/5cw7PygxR72Obz8K8mRwew) pour ensuite faire votre propre Memory.


## 👩‍⚖️ Licence

Memory est distribué sous licence MIT.

## 🙏 Crédits

Memory a été écrit à partir du [Memory Game de Nate Wiley](https://codepen.io/natewiley/pen/BawOqL) sous License MIT.
Il a été réécrit sans jQuery et ajoute les fonctionnalités suivantes :
- source des cartes en Markdown, grâce à la librairie [marked.js](https://marked.js.org/)
- lecture d'un fichier externe en Markdown en mettant l'URL dans le hash
- ajustement automatique de la taille de la police dans chaque carte, avec la librairie [textFit](https://github.com/STRML/textFit/)