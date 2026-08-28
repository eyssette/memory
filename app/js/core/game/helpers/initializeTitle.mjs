export function initializeTitle(memoryInfo) {
	if (memoryInfo.title) {
		document.title = memoryInfo.title;
		const h1 = document.querySelector("body > h1")
			? document.querySelector("body > h1")
			: document.createElement("h1");
		h1.textContent = memoryInfo.title;
		document.body.insertBefore(h1, document.querySelector(".wrap"));
	} else {
		const h1 = document.querySelector("body > h1");
		if (h1) h1.remove();
	}
}
