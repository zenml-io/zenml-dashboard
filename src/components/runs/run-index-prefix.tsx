import { formatRunIndex } from "./runs";

type Props = {
	index?: number | null;
};

/**
 * Displays a run index with leading zeros (4 digits).
 * e.g., 1 => #0001-, 42 => #0042-, 1234 => #1234-
 *
 * Only renders if index is provided and is a valid number.
 */
export function RunIndexPrefix({ index }: Props) {
	if (index == null) return null;

	return <span className="text-theme-text-tertiary">#{formatRunIndex(index)}-</span>;
}
