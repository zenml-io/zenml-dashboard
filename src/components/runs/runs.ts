/**
 * Formats a run index as a 4-digit zero-padded string.
 * e.g., 1 => "0001", 42 => "0042", 1234 => "1234"
 */
export function formatRunIndex(index: number): string {
	return String(index).padStart(4, "0");
}

/**
 * Formats a run name with an optional index prefix.
 * e.g., formatRunName("my-run", 1) => "#0001-my-run"
 * e.g., formatRunName("my-run") => "my-run"
 */
export function formatRunName(name: string, index?: number | null): string {
	if (index == null) return name;
	return `#${formatRunIndex(index)}-${name}`;
}
