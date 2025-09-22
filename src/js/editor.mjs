import { Memory } from "./gameLogic.mjs";
import { defaultMD } from "./defaultContent.mjs";
import { CodeJar } from "./lib/codejar.js";

// Fonction debounce pour gérer l'update des cards avec un délai
function debounce(func, wait) {
	let timeout;
	return function (...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

// Fonction pour mettre à jour les cartes
function updateCards() {
	const editorElement = document.querySelector(".editor");
	const md = editorElement.textContent;
	Memory.init(md);
}

function eventKeyUpDebounceUpdateCards() {
	// Utiliser debounce pour appeler updateCards avec un délai afin d'éviter un lag dans le cas d'un document long
	const editorElement = document.querySelector(".editor");
	const debouncedUpdateCards = debounce(() => updateCards(), 300);
	editorElement.addEventListener("keyup", () => {
		debouncedUpdateCards();
	});
}

const highlightCode = (editor) => {
	let code = editor.textContent;

	// On autorise l'utilisation de balises HTML
	code = code
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");

	// Coloration syntaxique pour les titres
	code = code.replace(/^(#{1,6}) +(.*)/gm, (match, p1, p2) => {
		let level = p1.length;
		return `<span class="markdownTitles h${level}">${p1} ${p2}</span>`;
	});

	// Coloration syntaxique pour le texte en gras
	code = code.replace(
		/\*\*(\w.*?)\*\*/g,
		'<span class="markdownBold">**$1**</span>',
	);
	code = code.replace(
		/__(\w.*?)__/g,
		'<span class="markdownBold">__$1__</span>',
	);
	// Coloration syntaxique pour le texte en italique
	code = code.replace(
		/(?<!\*)\*(\w.*?)\*(?!\*)/g,
		'<span class="markdownItalic">*$1*</span>',
	);
	code = code.replace(
		/(?<!_)_(\w.*?)_(?!_)/g,
		'<span class="markdownItalic">_$1_</span>',
	);
	// Coloration syntaxique pour les listes
	code = code.replace(
		/^(\s*)([-*]|\d+\.)(\s)/gm,
		'<span class="markdownLists">$1$2</span>$3',
	);
	// Coloration syntaxique pour les liens
	code = code.replace(
		/(\[.*?\])\((.*?)\)/g,
		'<span class="markdownLinksText">$1</span><span class="markdownLinksURL">($2)</span>',
	);

	// Coloration syntaxique pour les tags html
	code = code.replace(
		/(&lt;aside&gt;)(.*?)(&lt;\/aside&gt;)/g,
		'<span class="markdownHTMLtag">$1</span><span class="markdownHTMLtagContent">$2</span><span class="markdownHTMLtag">$3</span>',
	);

	// Coloration syntaxique pour les commentaires html
	code = code.replace(
		/(&lt;!--.*?--&gt;)/g,
		'<span class="markdownHTMLcomment">$1</span>',
	);

	// Coloration syntaxique pour les séparations
	code = code.replaceAll("---", '<span class="markdownSeparator">---</span>');

	editor.innerHTML = code;
};

const optionsCodeJar = {
	addClosing: false,
	spellCheck: true,
	preserveIdent: false,
	tab: "\t",
};

export function initMarkdownEditor() {
	const editorWrapper = document.createElement("div");
	editorWrapper.className = "editor-wrapper";
	document.body.insertBefore(editorWrapper, document.body.firstChild);
	const editor = document.createElement("div");
	editor.className = "editor";
	editor.setAttribute(
		"data-placeholder",
		"Éditez le Markdown ici pour créer votre propre Memory !",
	);
	setTimeout(() => {
		const rulesReminder = `

**Règle 1**
On sépare chaque carte avec une ligne vide.

**Règle 2**
Si vous voulez associer deux éléments, écrivez le premier élément sur une ligne, puis allez à la ligne pour écrire le deuxième élément : utilisez la syntaxe Markdown pour écrire votre texte ou insérer une image.

**Règle 3**
Si une seule ligne est présente, au lieu d'associer deux éléments différents, la carte sera répétée deux fois et il s'agira alors de retrouver la carte identique.

**Règle 4**
Pour insérer une image, utilisez la syntaxe Markdown classique \`![](URL_de_l_image)\`

**Règle 5**
Pour insérer un fichier audio, utilisez la syntaxe suivante : \`audio: URL_DU_FICHIER_AUDIO\`


`;
		editorWrapper.appendChild(editor);
		const closeEditorButton = document.createElement("button");
		closeEditorButton.className = "close-editor-button";
		closeEditorButton.title = "Fermer l'éditeur Markdown";
		closeEditorButton.innerHTML = "Fermer l'éditeur";
		closeEditorButton.addEventListener("click", () => {
			const closeEditorConfirm = confirm(
				"Voulez-vous vraiment fermer l'éditeur Markdown ?\n\nVos modifications seront perdues si vous n'avez pas copié le contenu de l'éditeur avant de fermer.",
			);
			if (closeEditorConfirm) {
				document.body.classList.remove("editMode");
				closeEditorButton.style.display = "none";
				editorWrapper.style.display = "none";
				const footer = document.querySelector("footer");
				footer.style.display = "block";
				footer.style.top = "25vh";
				const style = document.querySelector("style#cardsVisible");
				jar.updateCode(defaultMD + rulesReminder);
				Memory.init(defaultMD);
				if (style) style.remove();
			}
		});
		editorWrapper.appendChild(closeEditorButton);
		const footer = document.querySelector("footer");
		footer.style.top = "50vh";
		const jar = CodeJar(editor, highlightCode, optionsCodeJar);
		const editorElement = document.querySelector(".editor");
		let md = editorElement.textContent;
		md = md ? md : defaultMD + rulesReminder;
		jar.updateCode(md);
		Memory.init(md);
		eventKeyUpDebounceUpdateCards();
		// Quand la souris est sur l'éditeur, on affiche le contenu des cartes
		editorWrapper.addEventListener("mouseover", () => {
			document.body.classList.remove("mouseOutEditor");
			if (document.body.classList.contains("editMode")) {
				let md = editorElement.textContent;
				md = md ? md : defaultMD + rulesReminder;
				Memory.init(md);
			}
			if (document.querySelector("style#cardsVisible")) return;
			md = editorElement.textContent;
			const style = document.createElement("style");
			style.innerHTML = `
				.card .inside:not(.picked) .front {
					backface-visibility: visible!important;
    				transform: rotateX(0)!important;
				}
				.card .inside.picked .front {
					backface-visibility: visible!important;
					transform: rotateX(180)!important;
				}
				.card .back {
					display:none!important;
				}
			`;
			style.setAttribute("id", "cardsVisible");
			document.body.appendChild(style);
		});
		// Quand la souris sort de l'éditeur, on remet les cartes face cachée
		editorWrapper.addEventListener("mouseout", () => {
			document.body.classList.add("mouseOutEditor");
			if (document.body.classList.contains("editMode")) {
				let md = editorElement.textContent;
				md = md ? md : defaultMD + rulesReminder;
				Memory.init(md);
			}
			const style = document.querySelector("style#cardsVisible");
			if (style) style.remove();
		});
	}, 100);
}
