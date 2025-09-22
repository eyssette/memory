export function handleURL(url, options) {
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
				"https://raw.githubusercontent.com",
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

export function getMarkdownFromURL(url) {
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
				error,
			);
			return "";
		});
}

export function getURLfromHash() {
	const hash = window.location.hash.substring(1);
	return handleURL(hash) || "";
}

export function redirectToUrl(input, baseURL = window.location.origin) {
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

export function loadScript(src, name) {
	const prefixScript = "script-";
	// Fonction pour charger des scripts
	const alreadyLoaded = document.querySelector("#" + prefixScript + name);
	return new Promise((resolve, reject) => {
		if (!alreadyLoaded) {
			const script = document.createElement("script");
			script.src = src;
			script.id = prefixScript + name;
			script.onload = resolve;
			script.onerror = reject;
			document.head.appendChild(script);
		} else {
			resolve();
		}
	});
}
export function loadCSS(src, name) {
	const prefixCSS = "css-";
	// Fonction pour charger des CSS
	const cssElement = document.querySelector("#" + prefixCSS + name);
	if (!cssElement) {
		return new Promise((resolve, reject) => {
			let styleElement;
			if (src.startsWith("<style>")) {
				styleElement = document.createElement("style");
				styleElement.id = prefixCSS + name;
				styleElement.textContent = src
					.replace("<style>", "")
					.replace("</style>", "");
				resolve();
			} else {
				styleElement = document.createElement("link");
				styleElement.href = src;
				styleElement.id = prefixCSS + name;
				styleElement.rel = "stylesheet";
				styleElement.onload = resolve;
				styleElement.onerror = reject;
			}
			document.head.appendChild(styleElement);
		});
	}
}
