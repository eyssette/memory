import { marked } from "../../lib/marked.js";

const renderer = {
	link(href, title, text) {
		const link = marked.Renderer.prototype.link.call(this, href, title, text);
		return link.replace("<a", "<a target='_blank' rel='noreferrer' ");
	},
};

marked.use({
	renderer,
});

function stripYAML(md) {
	return md.replace(/^---[\s\S]*?---\s*/, "");
}

export function parseMarkdown(md) {
	md = stripYAML(md);
	// Extraire le titre H1
	const titleMatch = md.match(/^# (.*)/);
	const title = titleMatch ? titleMatch[1].trim() : null;

	// Extraire le premier blockquote
	const blockquoteMatch = md.match(/^>\s*(.*)/gm);
	const blockquote = blockquoteMatch ? blockquoteMatch.join("\n").trim() : null;

	// Trouver l'index de début du contenu des cartes après le titre H1 et le blockquote
	const contentStartIndex = Math.max(
		titleMatch ? md.indexOf(titleMatch[0]) + titleMatch[0].length : 0,
		blockquoteMatch ? md.indexOf(blockquote) + blockquote.length : 0,
	);

	// Ignorer les lignes vides après le titre H1 et le blockquote
	const startIndex = md.slice(contentStartIndex).match(/^\s*\n*/);
	const startLine = startIndex
		? contentStartIndex + startIndex[0].length
		: contentStartIndex;

	// Traiter le contenu après le titre H1 et le blockquote
	const content = md.slice(startLine).replace(/\n\n+/g, "\n\n").trim();
	const cardsContent = content.split("\n\n");
	const cards = [];
	cardsContent.forEach((card, index) => {
		if (card.includes("\n")) {
			const cardSubCards = card.split("\n");
			cards.push({
				content: cardSubCards[0],
				id: index,
				match: cardSubCards[1],
			});
			cards.push({ content: cardSubCards[1], id: index });
		} else {
			cards.push({ content: card, id: index });
		}
	});
	return { cards, title, blockquote };
}
