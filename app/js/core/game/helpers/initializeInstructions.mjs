export function initializeInstructions(memoryInfo, md2html) {
	if (memoryInfo.blockquote) {
		const div = document.querySelector(".instructions")
			? document.querySelector(".instructions")
			: document.createElement("div");
		div.className = "instructions";
		div.innerHTML = md2html(memoryInfo.blockquote);
		const h1 = document.querySelector("body > h1");
		if (h1) {
			h1.insertAdjacentElement("afterend", div);
		} else {
			document.body.insertBefore(div, document.querySelector(".wrap"));
		}
	} else {
		const div = document.querySelector(".instructions");
		if (div) div.remove();
	}
}
