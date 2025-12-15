export function sanitizeHtml(html, allowedTags) {
	return html.replace(/<[^>]+>/g, (tag) => {
		return allowedTags.includes(tag) ? tag : "";
	});
}
