import { load as loadYAML } from "../../lib/js-yaml.js";
import { loadCSS, loadScript } from "../../utils/url.mjs";

function resetCustomStyles(customCSSelement) {
	if (customCSSelement) {
		customCSSelement.innerHTML = "";
	}
}
export function processYAML(md) {
	let yaml;
	const customCSSelement = document.querySelector("#customCSS");
	if (md.split("---").length > 2 && md.startsWith("---")) {
		try {
			// Traitement des propriétés dans le YAML
			yaml = loadYAML(md.split("---")[1]);
			if (yaml && yaml.style) {
				const styleElement = customCSSelement
					? customCSSelement
					: document.createElement("style");
				styleElement.innerHTML = yaml.style;
				if (!customCSSelement) {
					styleElement.id = "customCSS";
					document.body.appendChild(styleElement);
				}
			} else {
				resetCustomStyles(customCSSelement);
			}
			if (yaml && yaml.maths) {
				loadScript(
					"https://cdn.jsdelivr.net/npm/katex/dist/katex.min.js",
					"katexJS",
				);
				loadScript("src/js/lib/markedKatex.js", "markedKatex");
				loadCSS(
					"https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css",
					"katexCSS",
				);
			}
			if (yaml && yaml.wintext) {
				const winner = document.querySelector(".winner");
				winner.textContent = yaml.wintext;
			}
		} catch (e) {
			resetCustomStyles(customCSSelement);
			console.log("erreur processYAML : " + e);
			return "";
		}
	} else {
		resetCustomStyles(customCSSelement);
	}
	return yaml;
}
