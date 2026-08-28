// On peut créer des helpers pour Jasmine, qui peuvent servir notamment à mocker l'objet window, ou d'autres objets globaux.

// Exemple de helper pour créer un objet window avec JSDOM
// Il faudrait installer JSDOM avec `npm install -D jsdom` avant d'utiliser ce helper, puis l'importer dans un fichier de test pour l'utiliser
import { JSDOM } from "jsdom";

export function getWindow() {
	const { window } = new JSDOM(`<!DOCTYPE html><body>test</body>`);
	return window;
}
