import { z } from "zod";
import { isArray, isObject } from "./type-guards";

/**
 * Converts an object to URLSearchParams
 * - Filters out null and undefined values
 * - Handles arrays by creating multiple entries with the same key
 * - Stringifies objects using JSON.stringify
 * - Converts other non-string values using toString()
 *
 * @param object The object to convert to search parameters
 * @returns URLSearchParams object
 */
export function objectToSearchParams(object: Record<string, unknown>): URLSearchParams {
	const searchParams = new URLSearchParams();

	// Process each key-value pair in the object
	Object.entries(object).forEach(([key, value]) => {
		// Skip null and undefined values
		if (value === null || value === undefined) {
			return;
		}

		// Handle arrays - add multiple entries with the same key
		if (isArray(value)) {
			value.forEach((item) => {
				if (item !== null && item !== undefined) {
					// Stringify objects within arrays
					if (typeof item === "object") {
						searchParams.append(key, JSON.stringify(item));
					} else {
						searchParams.append(key, String(item));
					}
				}
			});
		}
		// Handle plain objects by stringifying them
		else if (isObject(value)) {
			searchParams.append(key, JSON.stringify(value));
		}
		// Handle all other types by converting to string
		else {
			searchParams.append(key, String(value));
		}
	});

	return searchParams;
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

export const urlSchema = z.string().url();

export function isUrl(probe: string) {
	return urlSchema.safeParse(probe).success;
}
