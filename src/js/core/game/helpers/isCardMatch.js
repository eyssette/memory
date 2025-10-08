import {
	extractContentFromCardHtmlElement,
	extractContentFromCardObject,
} from "./extractContentCards";

// Fonction qui vérifie si deux cartes sélectionnées forment une paire correcte
export function isCardMatch(firstCardContent, secondCardElement, cardsData) {
	// Extraction du contenu de la deuxième carte
	const secondCardContent =
		extractContentFromCardHtmlElement(secondCardElement);

	// Vérification du match prédéfini dans le sens "match attendu 1ère carte" = "contenu 2e carte"
	const firstCardData = cardsData.find(
		(card) => extractContentFromCardObject(card) == firstCardContent,
	);
	if (
		firstCardData &&
		firstCardData.match &&
		firstCardData.match == secondCardContent
	) {
		return true;
	}

	// Vérification du match prédéfini dans le sens "match attendu 2e carte" = "contenu 1ère carte"
	const secondCardData = cardsData.find(
		(card) => extractContentFromCardObject(card) == secondCardContent,
	);
	if (
		secondCardData &&
		secondCardData.match &&
		secondCardData.match == firstCardContent
	) {
		return true;
	}

	// si aucun match prédéfini n'existe : vérification du match par l'ID des cartes
	if (firstCardData) {
		const secondCardId = secondCardElement.getAttribute("data-id");
		return firstCardData.id == secondCardId;
	}

	return false;
}
