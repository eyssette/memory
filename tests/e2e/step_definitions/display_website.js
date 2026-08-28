const { I } = inject();

Given("Je lance la page d'accueil", () => {
	I.amOnPage("/");
});

Then("Je vois le texte MemoryMD", () => {
	I.waitForText("MemoryMD", 1);
});
