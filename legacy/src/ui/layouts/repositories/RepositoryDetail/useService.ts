/* eslint-disable */

import { repositoryActions, runPagesActions } from '../../../../redux/actions';
import { useDispatch } from 'react-redux';
import { filterObjectForParam } from '../../../../utils';

export const callActionForRepositoryRunsForPagination = () => {
  const dispatch = useDispatch();

  function dispatchRepositoryRunsData(
    id: any,
    page: number,
    size: number,
    filters?: any[],
    sortby?: string,
  ) {
    const logicalOperator = localStorage.getItem('logical_operator');
    let filtersParam = filterObjectForParam(filters);

    setFetching(true);
    dispatch(
      repositoryActions.getRunsForRepositoryID({
        sort_by: sortby ? sortby : 'created',
        logical_operator: logicalOperator ? JSON.parse(logicalOperator) : 'and',
        repositoryID: id,
        page: page,
        size: size,
        filtersParam,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }

  const setFetching = (fetching: boolean) => {
    dispatch(runPagesActions.setFetching({ fetching }));
  };

  return {
    setFetching,
    dispatchRepositoryRunsData,
  };
};
