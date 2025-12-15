type AllowedDeepLinkProtocol = "https:" | "http:" | "vscode:" | "cursor:";

const ALLOWED_DEEP_LINK_PROTOCOLS: ReadonlySet<AllowedDeepLinkProtocol> = new Set([
	"https:",
	"http:",
	"vscode:",
	"cursor:"
]);

export function isSafeDeepLinkUrl(rawUrl: string): boolean {
	if (!rawUrl) {
		return false;
	}

	try {
		const url = new URL(rawUrl);
		const protocol = url.protocol as AllowedDeepLinkProtocol;

		// Only allow explicitly whitelisted protocols
		if (!ALLOWED_DEEP_LINK_PROTOCOLS.has(protocol)) {
			return false;
		}

		// Cursor deep links must target the expected hostname
		if (protocol === "cursor:" && url.hostname !== "anysphere.cursor-deeplink") {
			return false;
		}

		return true;
	} catch {
		return false;
	}
}
