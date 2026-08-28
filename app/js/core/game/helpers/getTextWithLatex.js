// Récupère le contenu d'un élément HTML qui contient du Latex
export function getTextWithLatex(element) {
	let result = "";

	// Parcours récursif de tous les nœuds enfants
	function traverse(node) {
		if (node.nodeType === Node.TEXT_NODE) {
			// Texte normal
			result += node.textContent;
		} else if (node.nodeType === Node.ELEMENT_NODE) {
			if (node.classList.contains("katex")) {
				// Élément KaTeX → on récupére le contenu LaTeX original
				const annotation = node.querySelector(
					'annotation[encoding="application/x-tex"]',
				);
				if (annotation) {
					// Vérifie si c’est une formule inline ($) ou display ($$)
					const isDisplay = node.classList.contains("katex-display");
					const delimiter = isDisplay ? "$$" : "$";
					result += delimiter + annotation.textContent + delimiter;
				}
			} else {
				// Parcourt les autres enfants
				for (const child of node.childNodes) {
					traverse(child);
				}
			}
		}
	}

	traverse(element);
	return result.trim();
}
