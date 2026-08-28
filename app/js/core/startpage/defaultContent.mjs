import { getMarkdownFromURL } from "../../utils/url.mjs";
import { marked } from "../../lib/marked.js";
import { buildFooter } from "./footer/buildFooter.mjs";
import {
	initRedirectionEvents,
	initEditorButtonEvents,
} from "./footer/events.mjs";

export async function handleDefaultContent() {
	const footer = document.createElement("footer");
	const footerContent = await getMarkdownFromURL("README.md");
	const footerContentHTML = marked.parse(footerContent);

	footer.innerHTML = buildFooter(footerContentHTML);
	document.body.appendChild(footer);
	document.body.classList.add("default");

	initRedirectionEvents();
	initEditorButtonEvents();
}
