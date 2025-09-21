// Adaptation du Memory Game de Nate Wiley (License -- MIT / 2014)

const backImage = "assets/Blue_Question_Circle.svg";

const defaultMD = `Coucou !
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

const renderer = {
	link(href, title, text) {
		const link = marked.Renderer.prototype.link.call(this, href, title, text);
		return link.replace("<a", "<a target='_blank' rel='noreferrer' ");
	},
};

marked.use({
	renderer,
});

function parseMarkdown(md) {
	// Extraire le titre H1
	const titleMatch = md.match(/^# (.*)/);
	const title = titleMatch ? titleMatch[1].trim() : null;

	// Extraire le premier blockquote
	const blockquoteMatch = md.match(/^>\s*(.*)/gm);
	const blockquote = blockquoteMatch ? blockquoteMatch.join("\n").trim() : null;

	// Trouver l'index de début du contenu des cartes après le titre H1 et le blockquote
	const contentStartIndex = Math.max(
		titleMatch ? md.indexOf(titleMatch[0]) + titleMatch[0].length : 0,
		blockquoteMatch ? md.indexOf(blockquote) + blockquote.length : 0
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
			cards.push({ content: cardSubCards[0], id: index });
			cards.push({ content: cardSubCards[1], id: index });
		} else {
			cards.push({ content: card, id: index });
		}
	});
	return { cards, title, blockquote };
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

function redirectToUrl(input, baseURL = window.location.origin) {
	const hash = input.value.trim();
	baseURL = input.getAttribute("data-base-url")
		? "https://" + input.getAttribute("data-base-url")
		: baseURL;
	if (hash) {
		const fullUrl = baseURL + `#${hash}`;
		window.open(fullUrl, "_blank");
	} else {
		alert("Veuillez entrer une URL valide.");
	}
}

function addRedirectionToOnlineMarkdown(footerContentHTML) {
	const html = `<label for="redirect">Copiez ici le lien vers votre fichier, puis cliquer sur “OK” pour ouvrir votre Memory :</label>
<input type="url" id="redirect" class="redirect-input" placeholder="Votre URL"> <button  class="redirect-button" data-input-id="redirect" >OK</button>`;
	return footerContentHTML
		.replace("<!--INPUT_MARKDOWN-->", html)
		.replace(
			"<!--BUTTON_OPEN_EDITOR-->",
			`<button class="openEditor">Ouvrir l'éditeur en ligne</button>`
		);
}

let sound;

var Memory = {
	init: function (md) {
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
		this.setup();
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
			let cardContent = "";
			// Gestion des éléments audio
			if (card.content.startsWith("audio:")) {
				const audioURL = card.content.replace("audio:", "").trim();
				cardContent = `<div data-audio-src="${audioURL}">🔊</div>`;
			} else {
				cardContent = marked.parseInline(card.content);
			}
			frag += `<div class="card" data-id="${card.id}"><div class="inside"><div class="front">${cardContent}</div><div class="back"><img src="${backImage}" alt="" /></div></div></div>`;
		});
		return frag;
	},
};

async function main() {
	const isDefault = getURLfromHash() === "";
	let md = "";
	if (isDefault) {
		md = defaultMD;
		const footer = document.createElement("footer");
		const footerContent = await getMarkdownFromURL("README.md");
		const footerContentHTML = marked.parse(footerContent);
		// On ajoute le champ de redirection vers un markdown en ligne
		footer.innerHTML = addRedirectionToOnlineMarkdown(footerContentHTML);
		const observer = new MutationObserver(() => {
			const button = document.querySelector("button.redirect-button");
			const input = document.querySelector("input.redirect-input");
			if (button && input) {
				button.addEventListener("click", () => redirectToUrl(input));
				input.addEventListener("keydown", (event) => {
					if (event.key === "Enter") {
						redirectToUrl(input);
					}
				});
				observer.disconnect();
			}
		});
		observer.observe(document.body, { childList: true, subtree: true });
		document.body.appendChild(footer);
		document.body.classList.add("default");
		const openEditorButton = document.querySelector("button.openEditor");
		openEditorButton.addEventListener("click", () => {
			document.body.classList.toggle("editMode");
			const editorWrapper = document.querySelector(".editor-wrapper");
			if (editorWrapper === null) {
				initMarkdownEditor();
			} else {
				editorWrapper.style.display = "block";
				const closeEditorButton = document.querySelector(
					".close-editor-button"
				);
				closeEditorButton.style.display = "block";
				const footer = document.querySelector("footer");
				footer.style.display = "none";
				footer.style.top = "25vh";
				const mdFromEditor = document.querySelector(".editor").textContent;
				Memory.init(mdFromEditor);
			}
		});
	} else {
		md = await getMarkdownFromURL(getURLfromHash());
	}

	Memory.init(md);
}

main();
