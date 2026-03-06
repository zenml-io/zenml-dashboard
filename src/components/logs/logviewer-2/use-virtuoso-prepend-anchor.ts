import { useCallback, useState } from "react";

type FetchPreviousPageResult<TPage> = {
	data?: {
		pages?: TPage[];
	};
};

type Params<TPage> = {
	pages: TPage[] | undefined;
	hasPreviousPage: boolean;
	isFetchingPreviousPage: boolean;
	fetchPreviousPage: () => Promise<FetchPreviousPageResult<TPage>>;
	getPageItemCount: (page: TPage) => number;
	initialFirstItemIndex?: number;
};

const DEFAULT_INITIAL_FIRST_ITEM_INDEX = 1000000;

export function useVirtuosoPrependAnchor<TPage>({
	pages,
	hasPreviousPage,
	isFetchingPreviousPage,
	fetchPreviousPage,
	getPageItemCount,
	initialFirstItemIndex = DEFAULT_INITIAL_FIRST_ITEM_INDEX
}: Params<TPage>) {
	const [firstItemIndex, setFirstItemIndex] = useState(initialFirstItemIndex);

	const countItems = useCallback(
		(targetPages: TPage[] | undefined) => {
			return (
				targetPages?.reduce((count, page) => {
					return count + getPageItemCount(page);
				}, 0) ?? 0
			);
		},
		[getPageItemCount]
	);

	const loadOlderItems = useCallback(async () => {
		if (!hasPreviousPage || isFetchingPreviousPage) return;

		const itemsCountBefore = countItems(pages);
		const result = await fetchPreviousPage();
		const itemsCountAfter = countItems(result.data?.pages ?? pages);

		const prependedItemsCount = itemsCountAfter - itemsCountBefore;
		if (prependedItemsCount > 0) {
			setFirstItemIndex((previous) => previous - prependedItemsCount);
		}
	}, [countItems, fetchPreviousPage, hasPreviousPage, isFetchingPreviousPage, pages]);

	return {
		firstItemIndex,
		loadOlderItems
	};
}
