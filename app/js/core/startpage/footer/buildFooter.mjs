export function addRedirectionToOnlineMarkdown(footerContentHTML) {
	const htmlRedirection = `<label for="redirect">Copiez ici le lien vers votre fichier, puis cliquer sur “OK” pour ouvrir votre Memory :</label>
<input type="url" id="redirect" class="redirect-input" placeholder="Votre URL"> <button  class="redirect-button" data-input-id="redirect" >OK</button>`;
	return footerContentHTML.replace("<!--INPUT_MARKDOWN-->", htmlRedirection);
}

export function addButtonToOpenEditor(footerContentHTML) {
	const htmlButton =
		'<button class="openEditor">Ouvrir l\'éditeur en ligne</button>';
	return footerContentHTML.replace("<!--BUTTON_OPEN_EDITOR-->", htmlButton);
}

export function buildFooter(footerContentHTML) {
	let newFooterContentHTML = footerContentHTML;
	newFooterContentHTML = addRedirectionToOnlineMarkdown(newFooterContentHTML);
	newFooterContentHTML = addButtonToOpenEditor(newFooterContentHTML);
	return newFooterContentHTML;
}
