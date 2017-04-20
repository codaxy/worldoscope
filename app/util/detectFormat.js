import "./ShortCurrencyFormat";

export function detectFormat(text) {
	if (!text) return "short";

	if (text.indexOf("%") != -1) return "ps;0;1";

	if (text.indexOf("$") != -1) return "shortcurrency";

	return "short";
}
