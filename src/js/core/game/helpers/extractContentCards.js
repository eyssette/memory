import { getTextWithLatex } from "./getTextWithLatex";

export function extractContentFromCardHtmlElement(card) {
	let cardContent;
	const isAudio = card.innerHTML.includes("data-audio-src");
	if (isAudio) {
		cardContent = card
			.querySelector(".front div")
			.getAttribute("data-audio-src");
	} else {
		const isLatex = card.innerHTML.includes("katex");
		if (isLatex) {
			cardContent = getTextWithLatex(card);
		} else {
			cardContent =
				card.textContent.trim() || card.querySelector(".front img").src;
		}
	}
	cardContent = cardContent.replace(window.location.origin + "/", "");
	return cardContent;
}

export function extractContentFromCardObject(card) {
	let cardContent = card.content.trim();

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
