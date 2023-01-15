/* eslint-disable */

import { StackDetailRouteParams } from '.';
import {
  pipelinesActions,
  stackComponentsActions,
  stacksActions,
} from '../../../../redux/actions';
import {
  stackComponentSelectors,
  stackSelectors,
} from '../../../../redux/selectors';
import { useParams, useSelector } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { stackPagesActions } from '../../../../redux/actions';
import { useEffect } from 'react';
import { filterObjectForParam } from '../../../../utils';

interface ServiceInterface {
  stackComponent: TStack;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();
  const { id } = useParams<StackDetailRouteParams>();

  useEffect(() => {
    setFetching(true);
    // Legacy: previously runs was in pipeline
    dispatch(
      stackComponentsActions.stackComponentForId({
        stackComponentId: id,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
    dispatch(
      stackComponentsActions.allRunsByStackComponentId({
        sort_by: 'created',
        logical_operator: 'and',
        stackComponentId: id,
        page: 1,
        size: 5,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }, [id]);

  const setFetching = (fetching: boolean) => {
    dispatch(stackPagesActions.setFetching({ fetching }));
  };

  const stackComponent = useSelector(
    stackComponentSelectors.stackComponentForId(id),
  );

  return { stackComponent };
};

export const callActionForStackComponentRunsForPagination = () => {
  const dispatch = useDispatch();
  // const selectedProject = useSelector(projectSelectors.selectedProject);
  // const { id } = useParams<PipelineDetailRouteParams>();
  function dispatchStackComponentRunsData(
    id: any,
    page: number,
    size: number,
    filters?: any[],
  ) {
    let filtersParam = filterObjectForParam(filters);

    // debugger;
    setFetching(true);
    dispatch(
      stackComponentsActions.allRunsByStackComponentId({
        sort_by: 'created',
        logical_operator: Object.keys(filtersParam).length > 1 ? 'or' : 'and',
        stackComponentId: id,
        page: page,
        size: size,
        filtersParam,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }

  const setFetching = (fetching: boolean) => {
    dispatch(stackPagesActions.setFetching({ fetching }));
  };
  return {
    setFetching,
    dispatchStackComponentRunsData,
  };
};
