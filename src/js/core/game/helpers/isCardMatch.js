import {
	extractContentFromCardHtmlElement,
	extractContentFromCardObject,
} from "./extractContentCards";

// Fonction qui vérifie si deux cartes sélectionnées forment une paire correcte
export function isCardMatch(firstCardContent, secondCardElement, cards) {
	let isMatch = false;
	// On extrait le contenu de la deuxième carte sélectionnée (clic sur un élément HTML de classe "carte")
	const secondCardContent =
		extractContentFromCardHtmlElement(secondCardElement);
	// On cherche dans la liste des cartes celle dont le contenu correspond à la première carte sélectionnée
	const firstCardData = cards.filter(
		(card) => extractContentFromCardObject(card) == firstCardContent,
	);
	// On vérifie si la première carte sélectionnée contient une correspondance prédéfinie avec une autre carte qui est son "match"
	const firstCardHasMatch =
		firstCardData && firstCardData[0] && firstCardData[0].match;

	if (firstCardHasMatch) {
		// CAS 1 : la première carte sélectionnée a un "match" prédéfini
		// On vérifie si le contenu de la deuxième carte correspond au "match" de la première
		const matchingCardContent = firstCardData[0].match;
		isMatch = matchingCardContent == secondCardContent;
		return isMatch;
	} else {
		// La première carte n’a pas de "match" prédéfini
		// On cherche dans la liste des cartes celle dont le contenu correspond à la deuxième carte sélectionnée
		const secondCardData = cards.filter(
			(card) => extractContentFromCardObject(card) == secondCardContent,
		);
		// On vérifie si la deuxième carte sélectionnée contient une correspondance prédéfinie avec une autre carte qui est son "match"
		const secondCardHasMatch =
			secondCardData && secondCardData[0] && secondCardData[0].match;
		if (secondCardHasMatch) {
			// CAS 2 : la deuxième carte sélectionnée a un "match" prédéfini
			// On vérifie si le contenu de la première carte correspond au "match" de la deuxième
			const matchingCardContent = secondCardData[0].match;
			isMatch = matchingCardContent == firstCardContent;
			return isMatch;
		} else {
			// CAS 3 : aucune des deux cartes n’a de correspondance prédéfinie avec un "match" précis
			// Dans ce cas, c'est l'ID qui définit la correspondance, et on vérifie si les cartes ont le même.
			const secondCardId = secondCardElement.getAttribute("data-id");
			isMatch = firstCardData[0].id == secondCardId;
			return isMatch;
		}
	}
}
