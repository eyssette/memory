import { eventKeyUpDebounceUpdateCards } from "../helpers/updateCards.mjs";

export function initKeyboardEvents(Memory) {
	eventKeyUpDebounceUpdateCards(Memory);
}
