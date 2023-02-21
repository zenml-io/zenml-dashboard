/* eslint-disable */

import { StackDetailRouteParams } from '.';
import {
  pipelinesActions,
  runPagesActions,
  stackComponentPagesActions,
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
  id: TId;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();
  const { id } = useParams<StackDetailRouteParams>();
  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );
  const DEFAULT_ITEMS_PER_PAGE = 10;
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
        sort_by: 'desc:created',
        logical_operator: 'and',
        stackComponentId: id,
        index: 1,
        max_size: ITEMS_PER_PAGE ? ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }, [id]);

  const setFetching = (fetching: boolean) => {
    dispatch(stackPagesActions.setFetching({ fetching }));
    dispatch(runPagesActions.setFetching({ fetching }));
  };

  const stackComponent = useSelector(
    stackComponentSelectors.stackComponentForId(id),
  );

  return { stackComponent, id };
};

export const callActionForStackComponentRunsForPagination = () => {
  const dispatch = useDispatch();
  // const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  // const { id } = useParams<PipelineDetailRouteParams>();
  function dispatchStackComponentRunsData(
    id: any,
    page: number,
    size: number,
    filters?: any[],
    sortby?: string,
  ) {
    const logicalOperator = localStorage.getItem('logical_operator');
    let filtersParam = filterObjectForParam(filters);
    console.log(page, size, 'page,size');
    // debugger;
    setFetching(true);
    dispatch(
      stackComponentsActions.allRunsByStackComponentId({
        sort_by: sortby ? sortby : 'created',
        logical_operator: logicalOperator ? JSON.parse(logicalOperator) : 'and',
        stackComponentId: id,
        index: page,
        max_size: size,
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
    dispatchStackComponentRunsData,
  };
};
