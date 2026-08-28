// oxlint-disable-next-line import/no-unassigned-import
import "../css/styles.css";
// Gestion de la localisation (i18n) avec Paraglide
import {
	baseLocale,
	getLocale,
	overwriteGetLocale,
} from "./lib/paraglide/runtime.js";
import { createMemoryFromMarkdown } from "./core/game/createMemoryFromMarkdown.mjs";

overwriteGetLocale(() => {
	const browserLocale = navigator.language || baseLocale,
		[locale] = browserLocale.split("-");
	return locale;
});

const currentLocale = getLocale();
document.documentElement.lang = currentLocale;

createMemoryFromMarkdown();
