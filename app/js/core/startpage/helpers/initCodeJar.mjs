import { CodeJar } from "../../../lib/codejar.js";
import { highlightCode } from "../helpers/highlightCode.mjs";
import { optionsEditor } from "../helpers/optionsEditor.mjs";
import { defaultExample, rulesReminder } from "../const.mjs";

export function initJar(editor, Memory) {
	const jar = CodeJar(editor, highlightCode, optionsEditor);
	let md = editor.textContent || defaultExample + rulesReminder;
	jar.updateCode(md);
	Memory.init(md);
	return jar;
}
