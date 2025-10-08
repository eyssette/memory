import { extractContentFromMatchingCards } from "./extractContentCards";

export function isCardMatch(lastPick, lastPickMatchingCard, newPick, cards) {
	const newPickId = newPick.getAttribute("data-id");
	const cardsWithSameId = cards.filter((element) => element.id == newPickId);
	const matchingCardsWithDifferentContent = cardsWithSameId.filter(
		(element) => !element.content.includes(lastPick),
	);
	const matchingCards =
		matchingCardsWithDifferentContent.length > 0
			? matchingCardsWithDifferentContent
			: cardsWithSameId;
	return extractContentFromMatchingCards(matchingCards) == lastPickMatchingCard;
}
