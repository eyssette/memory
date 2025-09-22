import { defaultMD } from "../const.mjs";
import { rulesReminder } from "./rulesReminder.mjs";

export function resetEditor(jar, Memory, editorWrapper, closeEditorButton) {
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
