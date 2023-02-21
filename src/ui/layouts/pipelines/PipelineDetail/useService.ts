/* eslint-disable */

import { PipelineDetailRouteParams } from '.';
import { pipelinesActions } from '../../../../redux/actions';
import {
  pipelineSelectors,
  workspaceSelectors,
} from '../../../../redux/selectors';
import { useParams, useSelector } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { pipelinePagesActions } from '../../../../redux/actions';
import { useEffect } from 'react';
import { sign } from 'crypto';
import { filterObjectForParam } from '../../../../utils';
import { Sort } from '@table-library/react-table-library/types/sort';

interface ServiceInterface {
  pipeline: TPipeline;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const { id } = useParams<PipelineDetailRouteParams>();
  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );
  const DEFAULT_ITEMS_PER_PAGE = 10;
  useEffect(() => {
    setFetching(true);
    // Legacy: previously runs was in pipeline
    dispatch(
      pipelinesActions.pipelineForId({
        pipelineId: id,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
    dispatch(
      pipelinesActions.allRunsByPipelineId({
        sort_by: 'desc:created',
        logical_operator: 'and',
        pipelineId: id,
        index: 1,
        max_size: ITEMS_PER_PAGE ? ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }, [id]);

  const setFetching = (fetching: boolean) => {
    dispatch(pipelinePagesActions.setFetching({ fetching }));
  };

  const pipeline = useSelector(pipelineSelectors.pipelineForId(id));

  return { pipeline };
};

export const callActionForPipelineRunsForPagination = () => {
  const dispatch = useDispatch();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  // const { id } = useParams<PipelineDetailRouteParams>();
  function dispatchPipelineRunsData(
    id: any,
    page: number,
    size: number,
    filters?: any[],
    sortby?: string,
  ) {
    const logicalOperator = localStorage.getItem('logical_operator');
    let filtersParam = filterObjectForParam(filters);
    // console.log('aaaa', filters);
    setFetching(true);
    dispatch(
      pipelinesActions.allRunsByPipelineId({
        sort_by: sortby ? sortby : 'created',
        logical_operator: logicalOperator ? JSON.parse(logicalOperator) : 'and',
        pipelineId: id,
        index: page,
        max_size: size,
        filtersParam,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }

  const setFetching = (fetching: boolean) => {
    dispatch(pipelinePagesActions.setFetching({ fetching }));
  };

  return {
    setFetching,
    dispatchPipelineRunsData,
  };
};
