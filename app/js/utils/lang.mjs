// Gestion de la localisation (i18n) avec Paraglide
import {
	baseLocale,
	getLocale,
	overwriteGetLocale,
} from "../lib/paraglide/runtime.js";

// Définition de la langue du document en fonction de la locale actuelle
export function setLanguage() {
	overwriteGetLocale(() => {
		const browserLocale = navigator.language || baseLocale,
			[locale] = browserLocale.split("-");
		return locale;
	});
	const currentLocale = getLocale();
	document.documentElement.lang = currentLocale;
}
