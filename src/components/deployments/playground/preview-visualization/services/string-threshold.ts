import { COLLAPSE_STRING_THRESHOLD } from "@/lib/constants";

export function shouldCollapseString(value: string) {
	return value.length > COLLAPSE_STRING_THRESHOLD;
}
