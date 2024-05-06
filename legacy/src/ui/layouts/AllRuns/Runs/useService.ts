/* eslint-disable */

import { useEffect } from 'react';

import {
  pipelinePagesActions,
  runsActions,
  pipelinesActions,
  runPagesActions,
} from '../../../../redux/actions';
import { workspaceSelectors } from '../../../../redux/selectors';
import { useDispatch, useSelector } from '../../../hooks';
import { filterObjectForParam } from '../../../../utils';

interface ServiceInterface {
  setFetchingForAllRuns: (arg: boolean) => void;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );
  const DEFAULT_ITEMS_PER_PAGE = 10;
  useEffect(() => {
    setFetchingForAllRuns(true);
  }, [selectedWorkspace]);

  const setFetchingForAllRuns = (fetching: boolean) => {
    dispatch(runPagesActions.setFetching({ fetching }));
  };

  return {
    setFetchingForAllRuns,
  };
};

export const callActionForAllrunsForPagination = () => {
  const dispatch = useDispatch();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  function dispatchAllrunsData(
    page: number,
    size: number,
    filters?: any[],
    sortby?: string,
  ) {
    const logicalOperator = localStorage.getItem('logical_operator');
    let filtersParam = filterObjectForParam(filters);

    setFetchingForAllRuns(true);
    dispatch(
      runsActions.allRuns({
        workspace: selectedWorkspace,
        sort_by: sortby ? sortby : 'created',
        logical_operator: logicalOperator ? JSON.parse(logicalOperator) : 'and',
        page: page,
        size: size,
        filtersParam,
        onSuccess: () => setFetchingForAllRuns(false),
        onFailure: () => setFetchingForAllRuns(false),
      }),
    );
  }

  const setFetchingForAllRuns = (fetching: boolean) => {
    dispatch(runPagesActions.setFetching({ fetching }));
  };

  return {
    setFetchingForAllRuns,
    dispatchAllrunsData,
  };
};
