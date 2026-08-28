import { resetEditor } from "../helpers/resetEditor.mjs";
import { m } from "../../../lib/paraglide/messages.js";

export function createCloseButton(editorWrapper, jar, Memory) {
	const button = document.createElement("button");
	button.className = "close-editor-button";
	button.title = m.closeEditorButtonTitle();
	button.innerHTML = m.closeEditorButton();

	button.addEventListener("click", () => {
		const confirmClose = confirm(m.confirmCloseEditor());
		if (confirmClose) {
			resetEditor(jar, Memory, editorWrapper, button);
		}
	});

	editorWrapper.appendChild(button);
}
