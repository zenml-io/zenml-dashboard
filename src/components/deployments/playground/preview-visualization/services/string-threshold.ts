import { COLLAPSE_STRING_THRESHOLD_CHARACTERS } from "@/lib/constants";

export function shouldCollapseString(value: string) {
	return value.length > COLLAPSE_STRING_THRESHOLD_CHARACTERS;
}
