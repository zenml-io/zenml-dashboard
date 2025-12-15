import { useState } from "react";

export function useCopy() {
	const [copied, setCopied] = useState(false);

	function copyToClipboard(text: string) {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(text);
			setCopied(true);
			setTimeout(() => {
				setCopied(false);
			}, 2000);
		}
	}
	return { copied, copyToClipboard };
}
