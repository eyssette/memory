import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";
import cssnano from "cssnano";
import { string } from "rollup-plugin-string";

const ECMA_VERSION = 2018;
const optionsTerser = { ecma: ECMA_VERSION };

// On supprime certains messages d'erreurs qu'affiche Rollup et qui ne sont pas très utiles
const onwarn = (warning) => {
	if (warning.code === "THIS_IS_UNDEFINED") {
		// On désactive le message d'erreur affiché à cause du module showdown
		return;
	}
	console.warn(`(!) ${warning.message}`);
};

export default {
	input: "src/main.mjs",
	onwarn,
	output: {
		file: "src/script.min.js",
		format: "iife",
		sourcemap: true,
	},
	plugins: [
		terser(optionsTerser),
		string({
			include: "*.css",
		}),
		postcss({
			extensions: [".css"],
			include: ["src/style.css"],
			extract: "style.min.css",
			minimize: true,
			plugins: [
				cssnano({
					preset: "default",
				}),
			],
		}),
	],
};
