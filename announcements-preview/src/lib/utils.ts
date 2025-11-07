export function generateNumberFromSalt(salt: string): number {
	function hashString(str: string): number {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
		}
		return hash;
	}

	const hash = hashString(salt);
	return (hash % 49) + 1;
}

export function generateProjectImageUrl(projectName: string): string {
	return `https://public-flavor-logos.s3.eu-central-1.amazonaws.com/projects/${generateNumberFromSalt(
		projectName
	)}.jpg`;
}

export function prepareBackendTimestamp(dateString: string | number): Date {
	if (typeof dateString === "number") {
		return new Date(dateString);
	}
	if (!dateString.endsWith("Z")) {
		return new Date(dateString + "Z");
	}
	return new Date(dateString);
}

// Borrowed from the Angular sanitizer - Thank you Angular team!
const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;

/** A pattern that matches safe data URLs. It only matches image, video, and audio types. */
const DATA_URL_PATTERN =
	/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

function _sanitizeUrl(url: string): string {
	url = String(url);
	if (url === "null" || url.length === 0 || url === "about:blank") return "about:blank";
	if (url.match(SAFE_URL_PATTERN) || url.match(DATA_URL_PATTERN)) return url;

	return `unsafe:${url}`;
}

export function sanitizeUrl(url = "about:blank"): string {
	return _sanitizeUrl(String(url).trim());
}
