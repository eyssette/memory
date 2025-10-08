export function extractContentFromCardPicked(cardPicked) {
	const isAudio = cardPicked.innerHTML.includes("data-audio-src");
	let cardPickedContent = isAudio
		? cardPicked.querySelector(".front div").getAttribute("data-audio-src")
		: cardPicked.textContent.trim() ||
			cardPicked.querySelector(".front img").src;
	cardPickedContent = cardPickedContent.replace(
		window.location.origin + "/",
		"",
	);
	return cardPickedContent;
}

export function extractContentFromMatchingCards(matchingCards) {
	const text = matchingCards[0].content;

	// Pattern pour "audio: URL"
	const audioPattern = /^audio:\s*(.+)$/i;
	const audioMatch = text.match(audioPattern);

	if (audioMatch) {
		return audioMatch[1].trim();
	}

	// Pattern pour "![](URL)" ou "![alt](URL)"
	const markdownPattern = /!\[.*?\]\((.+?)\)/;
	const markdownMatch = text.match(markdownPattern);

	if (markdownMatch) {
		return markdownMatch[1].trim();
	}

	// Aucun pattern trouvé : on renvoie le texte initial
	return text;
}
