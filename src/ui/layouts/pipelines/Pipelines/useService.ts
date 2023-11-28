/* eslint-disable */

import { useEffect } from 'react';

import {
  pipelinePagesActions,
  pipelinesActions,
} from '../../../../redux/actions';
import { workspaceSelectors } from '../../../../redux/selectors';
import { useDispatch, useSelector } from '../../../hooks';
import { filterObjectForParam } from '../../../../utils';

interface ServiceInterface {
  setFetchingForPipeline: (arg: boolean) => void;
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
  }, [selectedWorkspace]);

  const setFetchingForPipeline = (fetching: boolean) => {
    dispatch(pipelinePagesActions.setFetching({ fetching }));
  };

  return {
    setFetchingForPipeline,
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
        page: page,
        size: size,
        filtersParam,

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
