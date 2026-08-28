import { CodeJar } from "../../../lib/codejar.js";
import { highlightCode } from "../helpers/highlightCode.mjs";
import { optionsEditor } from "../helpers/optionsEditor.mjs";
import { defaultMD, rulesReminder } from "../const.mjs";

export function initJar(editor, Memory) {
	const jar = CodeJar(editor, highlightCode, optionsEditor);
	let md = editor.textContent || defaultMD + rulesReminder;
	jar.updateCode(md);
	Memory.init(md);
	return jar;
}
