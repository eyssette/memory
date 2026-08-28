import { capitalizeFirstLetter } from "../../../app/js/utils/strings.mjs";

describe("capitalizeFirstLetter", () => {
	it("capitalizes the first letter of a lowercase word", () => {
		const result = capitalizeFirstLetter("hello");
		expect(result).toBe("Hello");
	});

	it("does not change a word that already starts with an uppercase letter", () => {
		const result = capitalizeFirstLetter("World");
		expect(result).toBe("World");
	});

	it("capitalizes only the first letter of the first word", () => {
		const result = capitalizeFirstLetter("hello world");
		expect(result).toBe("Hello world");
	});

	it("returns an empty string when given an empty string", () => {
		const result = capitalizeFirstLetter("");
		expect(result).toBe("");
	});
});
