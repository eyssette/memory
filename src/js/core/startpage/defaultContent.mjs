import { getMarkdownFromURL, redirectToUrl } from "../../utils/url.mjs";
import { marked } from "../../lib/marked.js";
import { initMarkdownEditor } from "./editor.mjs";

import { Memory } from "../game/gameLogic.mjs";

// Adaptation du Memory Game de Nate Wiley (License -- MIT / 2014)

export function addRedirectionToOnlineMarkdown(footerContentHTML) {
	const htmlRedirection = `<label for="redirect">Copiez ici le lien vers votre fichier, puis cliquer sur “OK” pour ouvrir votre Memory :</label>
<input type="url" id="redirect" class="redirect-input" placeholder="Votre URL"> <button  class="redirect-button" data-input-id="redirect" >OK</button>`;
	return footerContentHTML.replace("<!--INPUT_MARKDOWN-->", htmlRedirection);
}

export function addButtonToOpenEditor(footerContentHTML) {
	const htmlButton =
		'<button class="openEditor">Ouvrir l\'éditeur en ligne</button>';
	return footerContentHTML.replace("<!--BUTTON_OPEN_EDITOR-->", htmlButton);
}

function addToFooter(footerContentHTML) {
	let newFooterContentHTML = footerContentHTML;
	newFooterContentHTML = addRedirectionToOnlineMarkdown(newFooterContentHTML);
	newFooterContentHTML = addButtonToOpenEditor(newFooterContentHTML);
	return newFooterContentHTML;
}

export async function handleDefaultContent() {
	const footer = document.createElement("footer");
	const footerContent = await getMarkdownFromURL("README.md");
	const footerContentHTML = marked.parse(footerContent);
	// On ajoute le champ de redirection vers un markdown en ligne
	footer.innerHTML = addToFooter(footerContentHTML);
	const observer = new MutationObserver(() => {
		const button = document.querySelector("button.redirect-button");
		const input = document.querySelector("input.redirect-input");
		if (button && input) {
			button.addEventListener("click", () => redirectToUrl(input));
			input.addEventListener("keydown", (event) => {
				if (event.key === "Enter") {
					redirectToUrl(input);
				}
			});
			observer.disconnect();
		}
	});
	observer.observe(document.body, { childList: true, subtree: true });
	document.body.appendChild(footer);
	document.body.classList.add("default");
	const openEditorButton = document.querySelector("button.openEditor");
	openEditorButton.addEventListener("click", () => {
		// On teste si on est sur téléphone ou petit écran
		if (window.innerWidth < 600 || window.innerHeight < 500) {
			alert(
				"L'éditeur Markdown n'est pas disponible sur les petits écrans. Merci d'utiliser un ordinateur ou une tablette en mode paysage.",
			);
			return;
		}
		document.body.classList.toggle("editMode");
		const editorWrapper = document.querySelector(".editor-wrapper");
		if (editorWrapper === null) {
			initMarkdownEditor(Memory);
		} else {
			editorWrapper.style.display = "block";
			const closeEditorButton = document.querySelector(".close-editor-button");
			closeEditorButton.style.display = "block";
			const footer = document.querySelector("footer");
			footer.style.display = "none";
			footer.style.top = "25vh";
			const mdFromEditor = document.querySelector(".editor").textContent;
			Memory.init(mdFromEditor);
		}
	});
}
