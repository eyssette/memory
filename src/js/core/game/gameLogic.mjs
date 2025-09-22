import { parseMarkdown } from "../markdown/parseMarkdown.mjs";
import { marked } from "../../lib/marked.js";
import { textFit } from "../../lib/textFit.js";
import { duplicateUniqueCards } from "../../utils/arrays.mjs";
import { processYAML } from "../markdown/yaml.mjs";

const backImage = "assets/Blue_Question_Circle.svg";
let sound;

const defaultOptions = marked.getDefaults();

function resetMarked() {
	marked.setOptions(defaultOptions);
	marked.use({ extensions: [] });
}

// Adaptation du Memory Game de Nate Wiley (License -- MIT / 2014)

export const Memory = {
	init: async function (md) {
		const yaml = processYAML(md);
		const memoryInfo = parseMarkdown(md);
		const cards = memoryInfo.cards;
		if (memoryInfo.title) {
			document.title = memoryInfo.title;
			const h1 = document.querySelector("body > h1")
				? document.querySelector("body > h1")
				: document.createElement("h1");
			h1.textContent = memoryInfo.title;
			document.body.insertBefore(h1, document.querySelector(".wrap"));
		} else {
			const h1 = document.querySelector("body > h1");
			if (h1) h1.remove();
		}
		if (memoryInfo.blockquote) {
			const div = document.querySelector(".instructions")
				? document.querySelector(".instructions")
				: document.createElement("div");
			div.className = "instructions";
			div.innerHTML = marked.parse(memoryInfo.blockquote);
			const h1 = document.querySelector("body > h1");
			if (h1) {
				h1.insertAdjacentElement("afterend", div);
			} else {
				document.body.insertBefore(div, document.querySelector(".wrap"));
			}
		} else {
			const div = document.querySelector(".instructions");
			if (div) div.remove();
		}
		this.game = document.querySelector(".game");
		this.modal = document.querySelector(".modal");
		this.overlay = document.querySelector(".modal-overlay");
		this.restartButton = document.querySelector("button.restart");
		this.cardsArray = duplicateUniqueCards(cards);
		this.shuffleCards(this.cardsArray);
		this.setup(yaml);
	},

	shuffleCards: function (cardsArray) {
		if (
			document.querySelector(".editor-wrapper") &&
			!document.body.classList.contains("mouseOutEditor")
		) {
			// En mode édition, ne pas mélanger les cartes
			this.cards = cardsArray;
		} else {
			this.cards = this.shuffle(cardsArray);
		}
	},

	setup: async function (yaml) {
		this.html = await this.buildHTML(yaml);
		this.game.innerHTML = this.html;
		this.memoryCards = document.querySelectorAll(".card");
		this.paused = false;
		this.guess = null;
		this.binding(yaml);
		this.resize();
		const heightGameElement = this.game.offsetHeight;
		const heightHeaderElement =
			document.querySelector("body > h1").offsetHeight +
			document.querySelector(".instructions").offsetHeight;
		const newHeightGameElement = heightGameElement - heightHeaderElement - 100;
		this.game.style.height = newHeightGameElement + "px";
		document.body.querySelector(".wrap").style.height =
			newHeightGameElement + "px";
	},

	resize: function () {
		this.frontCards = document.querySelectorAll(".card .front");
		this.frontCards.forEach((frontCard) => {
			// Ajustement automatique de la taille de la police avec textFit : seulement pour le contenu texte, et pas pour les images
			if (!frontCard.innerHTML.includes("<img")) {
				textFit(frontCard, {
					reProcess: true,
					multiline: true,
				});
			}
		});
	},

	binding: function (yaml) {
		const self = this;
		this.memoryCards.forEach(function (card) {
			card.addEventListener("click", function () {
				self.cardClicked.call(self, card);
			});
		});
		this.restartButton.addEventListener("click", function () {
			self.reset.call(self, yaml);
		});
	},

	cardClicked: function (card) {
		const $card = card;
		const insideElement = $card.querySelector(".inside");
		// Gestion des éléments audio
		const audio = insideElement.querySelector("div[data-audio-src]");
		if (sound) {
			sound.pause();
			sound.currentTime = 0;
		}
		if (audio) {
			sound = new Audio(audio.getAttribute("data-audio-src"));
			sound.play();
		}
		if (
			insideElement &&
			!this.paused &&
			!insideElement.classList.contains("matched") &&
			!insideElement.classList.contains("picked")
		) {
			insideElement.classList.add("picked");
			if (!this.guess) {
				this.guess = $card.getAttribute("data-id");
			} else if (
				this.guess == $card.getAttribute("data-id") &&
				!$card.classList.contains("picked")
			) {
				document.querySelectorAll(".picked").forEach(function (pickedCard) {
					pickedCard.classList.add("matched");
				});
				this.guess = null;
			} else {
				this.guess = null;
				this.paused = true;
				const self = this;
				setTimeout(function () {
					document.querySelectorAll(".picked").forEach(function (pickedCard) {
						pickedCard.classList.remove("picked");
					});
					self.paused = false;
				}, 600);
			}
			if (
				document.querySelectorAll(".matched").length ==
				document.querySelectorAll(".card").length
			) {
				this.win();
			}
		}
	},

	win: function () {
		this.paused = true;
		const self = this;
		setTimeout(function () {
			self.showModal();
		}, 1000);
	},

	showModal: function () {
		this.overlay.style.display = "block";
		this.modal.style.display = "block";
	},

	hideModal: function () {
		this.overlay.style.display = "none";
		this.modal.style.display = "none";
	},

	reset: function (yaml) {
		this.hideModal();
		this.shuffleCards(this.cardsArray);
		this.setup(yaml);
		this.game.style.display = "block";
	},

	// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
	shuffle: function (array) {
		let counter = array.length;
		let temp;
		let index;
		// While there are elements in the array
		while (counter > 0) {
			// Pick a random index
			index = Math.floor(Math.random() * counter);
			// Decrease counter by 1
			counter--;
			// And swap the last element with it
			temp = array[counter];
			array[counter] = array[index];
			array[index] = temp;
		}
		return array;
	},

	buildHTML: async function (yaml) {
		let frag = "";

		// Si on doit gérer les maths
		const useMathsMode = yaml && yaml.maths === true;
		if (useMathsMode) {
			// Attente du chargement de markedKatex
			if (!window.markedKatex) {
				await new Promise((resolve) => {
					window.addEventListener("markedKatexLoaded", resolve, { once: true });
				});
			}

			// Configuration de marked avec markedKatex
			marked.use(
				window.markedKatex({
					throwOnError: false,
				}),
			);
		} else {
			resetMarked();
		}
		// Génération des cartes
		this.cards.forEach(function (card) {
			let cardContent = "";

			// Gestion des éléments audio
			if (card.content.startsWith("audio:")) {
				const audioURL = card.content.replace("audio:", "").trim();
				cardContent = `<div data-audio-src="${audioURL}">🔊</div>`;
			} else {
				cardContent = marked.parseInline(card.content);
			}

			frag += `
			<div class="card" data-id="${card.id}">
				<div class="inside">
					<div class="front">${cardContent}</div>
					<div class="back">
						<img src="${backImage}" alt="" />
					</div>
				</div>
			</div>`;
		});

		return frag;
	},
};
