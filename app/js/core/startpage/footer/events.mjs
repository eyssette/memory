import { redirectToUrl } from "../../../utils/url.mjs";
import { initMarkdownEditor } from "../editor.mjs";
import { Memory } from "../../game/gameLogic.mjs";

export function initRedirectionEvents() {
	// On ajoute le champ de redirection vers un markdown en ligne
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
}

export function initEditorButtonEvents() {
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
