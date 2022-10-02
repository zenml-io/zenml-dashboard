const FIRST_PAGE = 1;
const SECOND_PAGE = 2;

const getPage2 = (
  pageIndex: number,
  itemsPerPage: number,
  totalLength: number,
) => {
  if (pageIndex === 0) return pageIndex + 2;
  if ((pageIndex + 1) * itemsPerPage >= totalLength) return pageIndex;

  return pageIndex + 1;
};

const displayedPagesForMoreThanTwoPages = (
  pageIndex: any,
  itemsPerPage: any,
  totalLength: any,
) => {
  const page2 = getPage2(pageIndex, itemsPerPage, totalLength);
  return {
    page1: page2 - 1,
    page2,
    page3: page2 + 1,
  };
};

const hasOnlyOnePage = (totalLength: any, itemsPerPage: any) => {
  return totalLength <= itemsPerPage;
};

const hasOnlyTwoPages = (totalLength: any, itemsPerPage: any) => {
  return totalLength / 2 <= itemsPerPage;
};

const displayedPagesForTwoPages = {
  page1: FIRST_PAGE,
  page2: SECOND_PAGE,
};

const displayedPagesForOnePage = {
  page1: FIRST_PAGE,
};

export const getDisplayedPages = ({
  totalLength,
  pageIndex,
  itemsPerPage,
}: {
  totalLength: any;
  pageIndex: any;
  itemsPerPage: any;
}) => {
  if (hasOnlyOnePage(totalLength, itemsPerPage))
    return displayedPagesForOnePage;

  if (hasOnlyTwoPages(totalLength, itemsPerPage))
    return displayedPagesForTwoPages;

  return displayedPagesForMoreThanTwoPages(
    pageIndex,
    itemsPerPage,
    totalLength,
  );
};
