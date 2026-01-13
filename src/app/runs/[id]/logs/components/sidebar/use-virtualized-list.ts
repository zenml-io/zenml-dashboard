import { useVirtualizer } from "@tanstack/react-virtual";
import { RefObject } from "react";

/**
 * Custom hook for virtualized list functionality
 * @param items - Array of items to virtualize
 * @param parentRef - Ref to the scrollable container
 * @param estimateSize - Estimated size of each item (default: 52px)
 * @param overscan - Number of items to render outside the visible area (default: 5)
 */
export function useVirtualizedList<T>(
	items: T[],
	parentRef: RefObject<HTMLDivElement>,
	estimateSize = 52,
	overscan = 5
) {
	const virtualizer = useVirtualizer({
		count: items.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => estimateSize,
		overscan
	});

	const virtualItems = virtualizer.getVirtualItems();

	return {
		virtualizer,
		virtualItems,
		totalSize: virtualizer.getTotalSize(),
		startOffset: virtualItems[0]?.start ?? 0
	};
}
