import { defaultExample, rulesReminder } from "../const.mjs";

// oxlint-disable-next-line max-params
export function resetEditor(jar, Memory, editorWrapper, closeEditorButton) {
	document.body.classList.remove("editMode");
	closeEditorButton.style.display = "none";
	editorWrapper.style.display = "none";

	const footer = document.querySelector("footer");
	footer.style.display = "block";
	footer.style.top = "25vh";

	const style = document.querySelector("style#cardsVisible");
	jar.updateCode(defaultExample + rulesReminder);
	Memory.init(defaultExample);
	if (style) style.remove();
}
