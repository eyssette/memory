import { defaultMD } from "./defaultContent.mjs";
import { CodeJar } from "../../lib/codejar.js";
import { highlightCode } from "./helpers/highlightCode.mjs";
import { eventKeyUpDebounceUpdateCards } from "./helpers/updateCards.mjs";
import { optionsEditor } from "./helpers/optionsEditor.mjs";
import { rulesReminder } from "./helpers/rulesReminder.mjs";

export function initMarkdownEditor(Memory) {
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
		const jar = CodeJar(editor, highlightCode, optionsEditor);
		const editorElement = document.querySelector(".editor");
		let md = editorElement.textContent;
		md = md ? md : defaultMD + rulesReminder;
		jar.updateCode(md);
		Memory.init(md);
		eventKeyUpDebounceUpdateCards(Memory);
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
