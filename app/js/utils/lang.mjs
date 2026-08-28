// Gestion de la localisation (i18n) avec Paraglide
import {
	baseLocale,
	getLocale,
	overwriteGetLocale,
} from "../lib/paraglide/runtime.js";

// Stockage de la langue choisie par l'utilisateur
const STORAGE_KEY = "user-locale-preference";

// Récupération de la langue choisie par l'utilisateur
export function getUserLocale() {
	return localStorage.getItem(STORAGE_KEY);
}
// Définition de la langue choisie par l'utilisateur
export function setUserLocale(locale) {
	localStorage.setItem(STORAGE_KEY, locale);
}

// Récupération de la langue du navigateur
function getBrowserLocale() {
	const browserLocale = navigator.language;
	const [locale] = browserLocale.split("-");
	return locale;
}

// Définition de la langue du document
export function setLanguage() {
	overwriteGetLocale(() => {
		// Priorité 1 : Choix explicite de l'utilisateur
		const userChoice = getUserLocale();
		if (userChoice) {
			return userChoice;
		}
		const browserLocale = getBrowserLocale();
		// Priorité 2 : Langue du navigateur
		if (browserLocale) {
			return browserLocale;
		}
		// Priorité 3 : Langue par défaut
		return baseLocale;
	});
	const currentLocale = getLocale();
	document.documentElement.lang = currentLocale;
}
