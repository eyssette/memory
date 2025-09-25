let sound;

export function handleAudio(element) {
	if (sound) {
		sound.pause();
		sound.currentTime = 0;
	}
	const audio = element.querySelector("div[data-audio-src]");
	if (audio) {
		sound = new Audio(audio.getAttribute("data-audio-src"));
		sound.play();
	}
}