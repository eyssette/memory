import { marked } from "../../lib/marked.js";
import { m } from "../../lib/paraglide/messages.js";
import { buildFooter } from "./footer/buildFooter.mjs";
import {
	initRedirectionEvents,
	initEditorButtonEvents,
} from "./footer/events.mjs";

export async function handleDefaultContent() {
	const footer = document.createElement("footer");
	const footerContent = m.readMe();
	const footerContentHTML = marked.parse(footerContent);

	footer.innerHTML = buildFooter(footerContentHTML);
	document.body.appendChild(footer);
	document.body.classList.add("default");

	initRedirectionEvents();
	initEditorButtonEvents();
}
