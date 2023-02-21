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
  setFetchingForPipeline: (arg: boolean) => void;
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
    setFetchingForPipeline(true);
    setFetchingForAllRuns(true);
    dispatch(
      runsActions.allRuns({
        sort_by: 'desc:created',
        logical_operator: 'and',
        workspace: selectedWorkspace,
        index: 1,
        max_size: ITEMS_PER_PAGE ? ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE,
        onSuccess: () => setFetchingForAllRuns(false),
        onFailure: () => setFetchingForAllRuns(false),
      }),
    );
    dispatch(
      pipelinesActions.getMy({
        sort_by: 'desc:created',
        logical_operator: 'and',
        index: 1,
        max_size: ITEMS_PER_PAGE ? ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE,
        name: '',
        workspace: selectedWorkspace,
        onSuccess: () => setFetchingForPipeline(false),
        onFailure: () => setFetchingForPipeline(false),
      }),
    );
  }, [selectedWorkspace]);

  const setFetchingForPipeline = (fetching: boolean) => {
    dispatch(pipelinePagesActions.setFetching({ fetching }));
  };
  const setFetchingForAllRuns = (fetching: boolean) => {
    dispatch(runPagesActions.setFetching({ fetching }));
  };

  return {
    setFetchingForPipeline,
    setFetchingForAllRuns,
  };
};

export const callActionForPipelinesForPagination = () => {
  const dispatch = useDispatch();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  function dispatchPipelineData(
    page: number,
    size: number,
    filters?: any[],
    sortby?: string,
  ) {
    let filtersParam: any = filterObjectForParam(filters);
    setFetchingForPipeline(true);
    const logicalOperator = localStorage.getItem('logical_operator');
    dispatch(
      pipelinesActions.getMy({
        sort_by: sortby ? sortby : 'created',
        logical_operator: logicalOperator ? JSON.parse(logicalOperator) : 'and',
        index: page,
        max_size: size,
        filtersParam,
        // name: name ? name : '',
        workspace: selectedWorkspace,
        onSuccess: () => setFetchingForPipeline(false),
        onFailure: () => setFetchingForPipeline(false),
      }),
    );
  }

  const setFetchingForPipeline = (fetching: boolean) => {
    dispatch(pipelinePagesActions.setFetching({ fetching }));
  };

  return {
    setFetchingForPipeline,
    dispatchPipelineData,
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
        index: page,
        max_size: size,
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
