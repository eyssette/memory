import { sanitizeHtml } from "../../../app/js/utils/strings.mjs";

describe("sanitizeHtml", () => {
	it("returns input unchanged when there are no tags", () => {
		const input = "plain text";
		expect(sanitizeHtml(input, ["<b>", "</b>"])).toBe("plain text");
	});

	it("removes disallowed tags but keeps allowed tags intact", () => {
		const input = "<b>bold</b> <script>alert(1)</script> <i>italic</i>";
		const allowed = ["<b>", "</b>", "<i>", "</i>"];
		const out = sanitizeHtml(input, allowed);
		expect(out).toBe("<b>bold</b> alert(1) <i>italic</i>");
	});

	it("handles empty string input", () => {
		expect(sanitizeHtml("", [])).toBe("");
	});
});
