import { useCallback, useState } from "react";

export function useCopy() {
	const [copied, setCopied] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const copyToClipboard = useCallback((text: string) => {
		const isBrowser = typeof window !== "undefined" && typeof navigator !== "undefined";
		const hasClipboardApi =
			isBrowser &&
			typeof navigator.clipboard !== "undefined" &&
			typeof navigator.clipboard.writeText === "function";

		if (!isBrowser) {
			setError("Clipboard is not available in this environment.");
			return;
		}

		const performCopy = async () => {
			try {
				setError(null);

				if (hasClipboardApi) {
					await navigator.clipboard.writeText(text);
				} else if (typeof document !== "undefined") {
					const textarea = document.createElement("textarea");
					textarea.value = text;
					textarea.style.position = "fixed";
					textarea.style.opacity = "0";
					document.body.appendChild(textarea);
					textarea.focus();
					textarea.select();

					const successful =
						typeof document.execCommand === "function" ? document.execCommand("copy") : false;

					document.body.removeChild(textarea);

					if (!successful) {
						throw new Error("document.execCommand('copy') failed");
					}
				} else {
					throw new Error("No clipboard mechanism available.");
				}

				setCopied(true);
				window.setTimeout(() => {
					setCopied(false);
				}, 2000);
			} catch (err) {
				// Logging here helps debug unexpected clipboard issues across different environments.
				// We intentionally keep the user-facing behavior simple and rely on the error state for UI feedback.
				// eslint-disable-next-line no-console
				console.error("Failed to copy:", err);
				setError("Unable to copy to clipboard.");
			}
		};

		void performCopy();
	}, []);

	return { copied, error, copyToClipboard };
}
