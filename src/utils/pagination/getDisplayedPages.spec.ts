import { getDisplayedPages } from './getDisplayedPages';

const testPagesToShow = ({
  totalLength,
  pageIndex,
  itemsPerPage,
  returns,
}: any) => {
  it(`totaLength: ${totalLength}  and  pageIndex:${pageIndex} and totalPerPage: ${itemsPerPage}`, () => {
    expect(getDisplayedPages({ totalLength, pageIndex, itemsPerPage })).toEqual(
      returns,
    );
  });
};

describe('pagesToShow', () => {
  testPagesToShow({
    totalLength: 10,
    itemsPerPage: 10,
    pageIndex: 0,
    returns: {
      page1: 1,
    },
  });

  testPagesToShow({
    totalLength: 20,
    itemsPerPage: 10,
    pageIndex: 1,
    returns: {
      page1: 1,
      page2: 2,
    },
  });

  testPagesToShow({
    totalLength: 30,
    itemsPerPage: 10,
    pageIndex: 2,
    returns: {
      page1: 1,
      page2: 2,
      page3: 3,
    },
  });

  testPagesToShow({
    totalLength: 30,
    itemsPerPage: 10,
    pageIndex: 0,
    returns: {
      page1: 1,
      page2: 2,
      page3: 3,
    },
  });

  testPagesToShow({
    totalLength: 30,
    itemsPerPage: 10,
    pageIndex: 2,
    returns: {
      page1: 1,
      page2: 2,
      page3: 3,
    },
  });

  testPagesToShow({
    totalLength: 40,
    itemsPerPage: 10,
    pageIndex: 3,
    returns: {
      page1: 2,
      page2: 3,
      page3: 4,
    },
  });

  testPagesToShow({
    totalLength: 1,
    itemsPerPage: 10,
    pageIndex: 0,
    returns: {
      page1: 1,
    },
  });

  testPagesToShow({
    totalLength: 25,
    itemsPerPage: 10,
    pageIndex: 1,
    returns: {
      page1: 1,
      page2: 2,
      page3: 3,
    },
  });
});
