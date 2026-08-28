import { createEditor } from "./dom/createEditor.mjs";
import { createCloseButton } from "./dom/createCloseButton.mjs";
import { initJar } from "./helpers/initCodeJar.mjs";
import { initMouseEvents } from "./events/mouse.mjs";
import { initKeyboardEvents } from "./events/keyboard.mjs";

export function initMarkdownEditor(Memory) {
	const { editorWrapper, editor } = createEditor();
	document.body.insertBefore(editorWrapper, document.body.firstChild);

	setTimeout(() => {
		const footer = document.querySelector("footer");
		footer.style.top = "50vh";
		const jar = initJar(editor, Memory);
		createCloseButton(editorWrapper, jar, Memory);
		initKeyboardEvents(Memory);
		initMouseEvents(editorWrapper, editor, Memory);
	}, 100);
}
