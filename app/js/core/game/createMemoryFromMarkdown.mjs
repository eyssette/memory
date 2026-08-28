import { handleDefaultContent } from "../startpage/defaultContent.mjs";
import { defaultMD } from "../startpage/const.mjs";
import { getMarkdownFromURL, getURLfromHash } from "../../utils/url.mjs";
import { Memory } from "./gameLogic.mjs";
import { processYAML } from "../markdown/yaml.mjs";

export async function createMemoryFromMarkdown() {
	const isDefault = getURLfromHash() === "";
	let md = "";
	if (isDefault) {
		md = defaultMD;
		await handleDefaultContent();
	} else {
		md = (await getMarkdownFromURL(getURLfromHash())) || defaultMD;
	}
	const yaml = processYAML(md);
	if (yaml && yaml.maths === true) {
		const interval = setInterval(() => {
			if (window.markedKatex && window.katex) {
				clearInterval(interval);
				Memory.init(md);
			}
		}, 500);
	} else {
		Memory.init(md);
	}
}
