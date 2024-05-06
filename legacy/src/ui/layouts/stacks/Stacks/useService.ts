/* eslint-disable */

import { useEffect } from 'react';
import { stackPagesActions, stacksActions } from '../../../../redux/actions';
import { workspaceSelectors } from '../../../../redux/selectors';
import { useDispatch, useSelector, useLocationPath } from '../../../hooks';
import { filterObjectForParam } from '../../../../utils';

interface ServiceInterface {
  setFetching: (arg: boolean) => void;
}

export const useService = (): ServiceInterface => {
  const locationPath = useLocationPath();
  const dispatch = useDispatch();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );
  const DEFAULT_ITEMS_PER_PAGE = 10;
  useEffect(() => {
    setFetching(true);
  }, [locationPath, selectedWorkspace]);

  const setFetching = (fetching: boolean) => {
    dispatch(stackPagesActions.setFetching({ fetching }));
  };

  return {
    setFetching,
  };
};

export const callActionForStacksForPagination = () => {
  const locationPath = useLocationPath();
  const dispatch = useDispatch();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  function dispatchStackData(
    page: number,
    size: number,
    filters?: any[],
    sortby?: string,
    stackComponentId?: TId,
  ) {
    const logicalOperator = localStorage.getItem('logical_operator');
    let filtersParam = filterObjectForParam(filters);

    setFetching(true);
    dispatch(
      stacksActions.getMy({
        component_id: stackComponentId,
        workspace: selectedWorkspace,
        sort_by: sortby ? sortby : 'desc:created',
        logical_operator: logicalOperator ? JSON.parse(logicalOperator) : 'and',
        page: page,
        size: size,
        filtersParam,
        onSuccess: () => {
          setFetching(false);
          localStorage.setItem('logical_operator', JSON.stringify('and'));
        },
        onFailure: () => {
          setFetching(false);
          localStorage.setItem('logical_operator', JSON.stringify('and'));
        },
      }),
    );
  }

  const setFetching = (fetching: boolean) => {
    dispatch(stackPagesActions.setFetching({ fetching }));
  };

  return {
    setFetching,
    dispatchStackData,
  };
};
