// Adaptation du Memory Game de Nate Wiley (License -- MIT / 2014)

(function(){
	
	var Memory = {
		
		init: function(cards){
			this.game = document.querySelector(".game");
			this.modal = document.querySelector(".modal");
			this.overlay = document.querySelector(".modal-overlay");
			this.restartButton = document.querySelector("button.restart");
			this.cardsArray = cards.concat(cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},
		
		shuffleCards: function(cardsArray){
			this.cards = this.shuffle(cardsArray);
		},
		
		setup: function(){
			this.html = this.buildHTML();
			this.game.innerHTML = this.html;
			this.memoryCards = document.querySelectorAll(".card");
			this.paused = false;
			this.guess = null;
			this.binding();
		},
		
		binding: function(){
			var self = this;
			this.memoryCards.forEach(function(card) {
				card.addEventListener("click", function() {
					self.cardClicked.call(self, card);
				});
			});
			this.restartButton.addEventListener("click", function() {
				self.reset.call(self);
			});
		},
		
		cardClicked: function(card){
			var $card = card;
			var insideElement = $card.querySelector(".inside");
			if(insideElement && !this.paused && !insideElement.classList.contains("matched") && !insideElement.classList.contains("picked")){
				insideElement.classList.add("picked");
				if(!this.guess){
					console.log("test1")
					this.guess = $card.getAttribute("data-id");
				} else if(this.guess == $card.getAttribute("data-id") && !$card.classList.contains("picked")){
					document.querySelectorAll(".picked").forEach(function(pickedCard) {
							pickedCard.classList.add("matched");
					});
					this.guess = null;
				} else {
					this.guess = null;
					this.paused = true;
					var self = this;
					setTimeout(function(){
						document.querySelectorAll(".picked").forEach(function(pickedCard) {
								pickedCard.classList.remove("picked");
						});
						self.paused = false;
					}, 600);
				}
				if(document.querySelectorAll(".matched").length == document.querySelectorAll(".card").length){
					this.win();
				}
			}
		},
		
		win: function(){
			this.paused = true;
			var self = this;
			setTimeout(function(){
				self.showModal();
			}, 1000);
		},
		
		showModal: function(){
			this.overlay.style.display = "block";
			this.modal.style.display = "block";
		},
		
		hideModal: function(){
			this.overlay.style.display = "none";
			this.modal.style.display = "none";
		},
		
		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.game.style.display = "block";
		},
		
		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
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
		
		buildHTML: function(){
			var frag = '';

			this.cards.forEach(function(card) {
				frag += '<div class="card" data-id="'+ card.id +'"><div class="inside">\
				<div class="front"><img src="'+ card.img +'"\
				alt="'+ card.name +'" /></div>\
				<div class="back"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Blue_Question_Circle.svg"\
				alt="Codepen" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{
			name: "perso1",
			img: "https://forge.apps.education.fr/educajou/autobd/-/raw/main/contenus/personnages/Jous/1/perso01.svg?ref_type=heads",
			id: 1,
		},
		{
			name: "perso2",
			img: "https://forge.apps.education.fr/educajou/autobd/-/raw/main/contenus/personnages/Jous/1/perso02.png?ref_type=heads",
			id: 2
		},
		{
			name: "perso3",
			img: "https://forge.apps.education.fr/educajou/autobd/-/raw/main/contenus/personnages/Jous/1/perso03.svg?ref_type=heads",
			id: 3
		},
		{
			name: "perso4",
			img: "https://forge.apps.education.fr/educajou/autobd/-/raw/main/contenus/personnages/Jous/1/perso04.svg?ref_type=heads",
			id: 4
		},
		{
			name: "perso5",
			img: "https://forge.apps.education.fr/educajou/autobd/-/raw/main/contenus/personnages/Jous/1/perso05.svg?ref_type=heads",
			id: 5
		},
		{
			name: "perso6",
			img: "https://forge.apps.education.fr/educajou/autobd/-/raw/main/contenus/personnages/Jous/1/perso06.svg?ref_type=heads",
			id: 6
		},
		{
			name: "perso7",
			img: "https://forge.apps.education.fr/educajou/autobd/-/raw/main/contenus/personnages/Jous/1/perso07.svg?ref_type=heads",
			id: 7
		},
		{
			name: "perso8",
			img: "https://forge.apps.education.fr/educajou/autobd/-/raw/main/contenus/personnages/Jous/1/perso08.svg?ref_type=heads",
			id: 8
		},
		{
			name: "perso9",
			img: "https://forge.apps.education.fr/educajou/autobd/-/raw/main/contenus/personnages/Jous/1/perso09.svg?ref_type=heads",
			id: 9
		},
		
	];

	Memory.init(cards);

})();