import { m } from "../../../lib/paraglide/messages.js";

export function addRedirectionToOnlineMarkdown(footerContentHTML) {
	const htmlRedirection = `<label for="redirect">${m.redirectLabel()}</label>
<input type="url" id="redirect" class="redirect-input" placeholder="${m.redirectPlaceholder()}"> <button  class="redirect-button" data-input-id="redirect" >OK</button>`;
	return footerContentHTML.replace("<!--INPUT_MARKDOWN-->", htmlRedirection);
}

export function addButtonToOpenEditor(footerContentHTML) {
	const htmlButton = `<button class="openEditor">${m.openEditorButton()}</button>`;
	return footerContentHTML.replace("<!--BUTTON_OPEN_EDITOR-->", htmlButton);
}

export function buildFooter(footerContentHTML) {
	let newFooterContentHTML = footerContentHTML;
	newFooterContentHTML = addRedirectionToOnlineMarkdown(newFooterContentHTML);
	newFooterContentHTML = addButtonToOpenEditor(newFooterContentHTML);
	return newFooterContentHTML;
}
