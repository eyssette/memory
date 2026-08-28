import { defaultMD, rulesReminder } from "../const.mjs";

export function initMouseEvents(editorWrapper, editorElement, Memory) {
	// Quand la souris est sur l'éditeur, on affiche le contenu des cartes
	editorWrapper.addEventListener("mouseover", () => {
		document.body.classList.remove("mouseOutEditor");
		if (document.body.classList.contains("editMode")) {
			let md = editorElement.textContent || defaultMD + rulesReminder;
			Memory.init(md);
		}
		if (document.querySelector("style#cardsVisible")) return;

		const style = document.createElement("style");
		style.innerHTML = `
				.card .inside:not(.picked) .front {
					backface-visibility: visible!important;
    				transform: rotateX(0)!important;
				}
				.card .inside.picked .front {
					backface-visibility: visible!important;
					transform: rotateX(180)!important;
				}
				.card .back {
					display:none!important;
				}
			`;
		style.id = "cardsVisible";
		document.body.appendChild(style);
	});
	// Quand la souris sort de l'éditeur, on remet les cartes face cachée
	editorWrapper.addEventListener("mouseout", () => {
		document.body.classList.add("mouseOutEditor");
		if (document.body.classList.contains("editMode")) {
			let md = editorElement.textContent || defaultMD + rulesReminder;
			Memory.init(md);
		}
		const style = document.querySelector("style#cardsVisible");
		if (style) style.remove();
	});
}
