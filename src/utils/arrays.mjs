export function duplicateUniqueCards(cards) {
	// Compter les occurrences de chaque id
	const counts = cards.reduce((acc, card) => {
		acc[card.id] = (acc[card.id] || 0) + 1;
		return acc;
	}, {});

	// Filtrer les cartes uniques
	const uniques = cards.filter((card) => counts[card.id] === 1);

	// Retourner le tableau original + duplication des uniques
	return cards.concat(uniques);
}
