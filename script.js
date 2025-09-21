// Adaptation du Memory Game de Nate Wiley (License -- MIT / 2014)

const backImage =
	"assets/Blue_Question_Circle.svg";

const defaultMD = `
# Memory

Coucou !
Hi !

![](assets/perso_educajou.svg)

![](assets/brigit_et_komit.png)
Brigit & Komit
`;

function handleURL(url, options) {
	const corsProxy = "https://corsproxy.io/?url=";
	if (url !== "") {
		let addCorsProxy = options && options.useCorsProxy ? true : false;
		// Gestion des fichiers hébergés sur la forge et publiés sur une page web
		if (url.includes(".forge")) {
			addCorsProxy = false;
		}
		// Gestion des fichiers hébergés sur github
		if (url.startsWith("https://github.com")) {
			addCorsProxy = false;
			url = url.replace(
				"https://github.com",
				"https://raw.githubusercontent.com"
			);
			url = url.replace("/blob/", "/");
		}
		// gestion des fichiers hébergés sur codiMD / hedgedoc / digipage
		if (
			url.startsWith("https://codimd") ||
			url.startsWith("https://pad.numerique.gouv.fr/") ||
			url.includes("hedgedoc") ||
			url.includes("digipage")
		) {
			addCorsProxy = false;
			url = url
				.replace("?edit", "")
				.replace("?both", "")
				.replace("?view", "")
				.replace(/#$/, "")
				.replace(/\/$/, "");
			url = url.indexOf("download") === -1 ? url + "/download" : url;
		}
		// gestion des fichiers hébergés sur framapad ou digidoc
		if (
			(url.includes("framapad") || url.includes("digidoc")) &&
			!url.endsWith("/export/txt")
		) {
			addCorsProxy = false;
			url = url.replace(/\?.*/, "") + "/export/txt";
		}
		url = addCorsProxy ? corsProxy + url : url;
	}
	return url;
}

function getMarkdownFromURL(url) {
	return fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.text();
		})
		.catch((error) => {
			console.error(
				"There has been a problem with your fetch operation:",
				error
			);
			return defaultMD;
		});
}

function getURLfromHash() {
	const hash = window.location.hash.substring(1);
	return handleURL(hash) || "";
}

function parseMarkdown(md) {
	const content = md.replace(/#.*/g, "").replace(/\n\n+/g, "\n\n").trim();
	const cardsContent = content.split("\n\n");
	const cards = [];
	cardsContent.forEach((card, index) => {
		if (card.includes("\n")) {
			const cardSubCards = card.split("\n");
			cards.push({ content: cardSubCards[0], id: index });
			cards.push({ content: cardSubCards[1], id: index });
		} else {
			cards.push({ content: card, id: index });
		}
	});
	return cards;
}

function duplicateUniqueCards(cards) {
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

async function main() {
	var Memory = {
		init: function (cards) {
			this.game = document.querySelector(".game");
			this.modal = document.querySelector(".modal");
			this.overlay = document.querySelector(".modal-overlay");
			this.restartButton = document.querySelector("button.restart");
			this.cardsArray = duplicateUniqueCards(cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function (cardsArray) {
			this.cards = this.shuffle(cardsArray);
		},

		setup: function () {
			this.html = this.buildHTML();
			this.game.innerHTML = this.html;
			this.memoryCards = document.querySelectorAll(".card");
			this.paused = false;
			this.guess = null;
			this.binding();
			textFit(document.querySelectorAll(".front"), { multiLine: false });
		},

		binding: function () {
			var self = this;
			this.memoryCards.forEach(function (card) {
				card.addEventListener("click", function () {
					self.cardClicked.call(self, card);
				});
			});
			this.restartButton.addEventListener("click", function () {
				self.reset.call(self);
			});
		},

		cardClicked: function (card) {
			var $card = card;
			var insideElement = $card.querySelector(".inside");
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
					var self = this;
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
			var self = this;
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

		reset: function () {
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.game.style.display = "block";
		},

		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function (array) {
			var counter = array.length,
				temp,
				index;
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

		buildHTML: function () {
			var frag = "";

			this.cards.forEach(function (card) {
				const cardContent = marked.parseInline(card.content);
				frag += `<div class="card" data-id="${card.id}"><div class="inside"><div class="front">${cardContent}</div><div class="back"><img src="${backImage}" alt="" /></div></div></div>`;
			});
			return frag;
		},
	};

	const isDefault = getURLfromHash() === "";
	let md = ""
	if(isDefault)	{
		md = defaultMD
		const footer = document.createElement("footer");
		const footerContent = await getMarkdownFromURL('https://memory.forge.apps.education.fr/README.md')
		footer.innerHTML = marked.parse(footerContent);
		document.body.appendChild(footer);
	} else {
		md = await getMarkdownFromURL(getURLfromHash());
	}

	const cards = parseMarkdown(md);

	Memory.init(cards);
}

main();
