/* eslint-disable */

import { StackDetailRouteParams } from '.';
import {
  pipelinesActions,
  runPagesActions,
  stacksActions,
} from '../../../../redux/actions';
import { stackSelectors } from '../../../../redux/selectors';
import { useParams, useSelector } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { stackPagesActions } from '../../../../redux/actions';
import { useEffect } from 'react';
import { filterObjectForParam } from '../../../../utils';

interface ServiceInterface {
  stack: TStack;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();
  const { id } = useParams<StackDetailRouteParams>();

  useEffect(() => {
    setFetching(true);

    dispatch(
      stacksActions.stackForId({
        stackId: id,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
    // Legacy: previously runs was in pipeline
    dispatch(
      stacksActions.allRunsByStackId({
        sort_by: 'created',
        logical_operator: 'and',
        page: 1,
        size: 5,
        stackId: id,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }, [id]);

  const setFetching = (fetching: boolean) => {
    dispatch(runPagesActions.setFetching({ fetching }));
  };

  const stack = useSelector(stackSelectors.stackForId(id));

  return { stack };
};

export const callActionForStackRunsForPagination = () => {
  const dispatch = useDispatch();
  // const selectedProject = useSelector(projectSelectors.selectedProject);
  // const { id } = useParams<PipelineDetailRouteParams>();
  function dispatchStackRunsData(
    id: any,
    page: number,
    size: number,
    filters?: any[],
  ) {
    let filtersParam = filterObjectForParam(filters);

    console.log('aaaa', filters);
    setFetching(true);
    dispatch(
      stacksActions.allRunsByStackId({
        sort_by: 'created',
        logical_operator: Object.keys(filtersParam).length > 1 ? 'or' : 'and',
        stackId: id,
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
    dispatchStackRunsData,
  };
};
