// oxlint-disable-next-line import/no-unassigned-import
import "../css/styles.css";
// Gestion de la localisation (i18n) avec Paraglide
import { setLanguage } from "./utils/lang.mjs";
import { createMemoryFromMarkdown } from "./core/game/createMemoryFromMarkdown.mjs";

setLanguage();
createMemoryFromMarkdown();
