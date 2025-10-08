export function extractContentFromCardHtmlElement(card) {
	const isAudio = card.innerHTML.includes("data-audio-src");
	let cardContent = isAudio
		? card.querySelector(".front div").getAttribute("data-audio-src")
		: card.textContent.trim() || card.querySelector(".front img").src;
	cardContent = cardContent.replace(window.location.origin + "/", "");
	return cardContent;
}

export function extractContentFromCardObject(card) {
	let cardContent = card.content;

	// Pattern pour "audio: URL"
	const audioPattern = /^audio:\s*(.+)$/i;
	const audioMatch = cardContent.match(audioPattern);
	if (audioMatch) {
		return audioMatch[1].trim();
	}

	// Pattern pour "![](URL)" ou "![alt](URL)"
	const markdownPattern = /!\[.*?\]\((.+?)\)/;
	const markdownMatch = cardContent.match(markdownPattern);
	if (markdownMatch) {
		return markdownMatch[1].trim();
	}

	// Aucun pattern trouvé : on renvoie le contenu initial de la carte
	return cardContent;
}
