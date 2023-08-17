/* eslint-disable */

import { PipelineDetailRouteParams } from '.';
import { pipelinesActions, runPagesActions } from '../../../../redux/actions';
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

  const { id } = useParams<PipelineDetailRouteParams>();

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
  }, [id]);

  const setFetching = (fetching: boolean) => {
    dispatch(pipelinePagesActions.setFetching({ fetching }));
  };

  const pipeline = useSelector(pipelineSelectors.pipelineForId(id));

  return { pipeline };
};

export const callActionForPipelineRunsForPagination = () => {
  const dispatch = useDispatch();

  function dispatchPipelineRunsData(
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
      pipelinesActions.allRunsByPipelineId({
        sort_by: sortby ? sortby : 'desc:created',
        logical_operator: logicalOperator ? JSON.parse(logicalOperator) : 'and',
        pipelineId: id,
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
    dispatchPipelineRunsData,
  };
};
