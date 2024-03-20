import { getDisplayedPages } from './getDisplayedPages';
import { getContent } from './getContent';

export const getPaginationData = ({
  pageIndex,
  itemsPerPage,
  items,
}: {
  pageIndex: number;
  itemsPerPage: number;
  items: any[];
}) => {
  const itemsForPage = getContent({
    pageIndex,
    itemsPerPage,
    items,
  });

  const pages = getDisplayedPages({
    totalLength: items.length,
    itemsPerPage,
    pageIndex,
  }) as any;

  const totalOfPages = Math.ceil(items.length / itemsPerPage);

  return {
    itemsForPage,
    pages,
    totalOfPages,
  };
};
