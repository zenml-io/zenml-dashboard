import { useState } from 'react';
import { useHistory, useGetSearchParam } from '.';
import { updateQueryParams } from '../../utils';

export const usePaginationAsQueryParam = (): {
  pageIndex: number;
  setPageIndex: (arg: number) => void;
} => {
  const history = useHistory();
  const page = Number(useGetSearchParam('page')) || 1;
  const [pageIndex, updatePageIndex] = useState(page - 1);
  const setPageIndex = (index: any) => {
    updatePageIndex(index);
    history.push({
      search: updateQueryParams({
        page: index + 1,
      }),
    });
  };
  return {
    pageIndex,
    setPageIndex,
  };
};
