import { defaultMD, handleDefaultContent } from "./defaultContent.mjs";
import { getMarkdownFromURL, getURLfromHash } from "./utils/url.mjs";
import { Memory } from "./gameLogic.mjs";

export async function createMemoryFromMarkdown() {
	const isDefault = getURLfromHash() === "";
	let md = "";
	if (isDefault) {
		md = defaultMD;
		await handleDefaultContent();
	} else {
		md = (await getMarkdownFromURL(getURLfromHash())) || defaultMD;
	}
	Memory.init(md);
}
