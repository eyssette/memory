// Fonction debounce pour gérer l'update des cards avec un délai
function debounce(func, wait) {
	let timeout;
	return function (...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

// Fonction pour mettre à jour les cartes
function updateCards(Memory) {
	const editorElement = document.querySelector(".editor");
	const md = editorElement.textContent;
	Memory.init(md);
}

export function eventKeyUpDebounceUpdateCards(Memory) {
	// Utiliser debounce pour appeler updateCards avec un délai afin d'éviter un lag dans le cas d'un document long
	const editorElement = document.querySelector(".editor");
	const debouncedUpdateCards = debounce(() => updateCards(Memory), 300);
	editorElement.addEventListener("keyup", () => {
		debouncedUpdateCards();
	});
}
