/* eslint-disable */

import { useEffect } from 'react';
import {
  connectorsActions,
  secretPagesActions,
} from '../../../../redux/actions';
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

  useEffect(() => {
    setFetching(true);
  }, [locationPath, selectedWorkspace]);

  const setFetching = (fetching: boolean) => {
    dispatch(secretPagesActions.setFetching({ fetching }));
  };

  return {
    setFetching,
  };
};

export const callActionForConnectorsForPagination = () => {
  const locationPath = useLocationPath();
  const dispatch = useDispatch();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  function dispatchConnectorData(
    page: number,
    size: number,
    filters?: any[],
    sortby?: string,
  ) {
    const logicalOperator = localStorage.getItem('logical_operator');
    let filtersParam = filterObjectForParam(filters);

    setFetching(true);
    dispatch(
      connectorsActions.getMy({
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
    dispatch(secretPagesActions.setFetching({ fetching }));
  };

  return {
    setFetching,
    dispatchConnectorData,
  };
};
export const callActionForConnectorComponentForPagination = () => {
  const locationPath = useLocationPath();
  const dispatch = useDispatch();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  function dispatchConnectorComponentsData(
    page: number,
    size: number,
    filters?: any[],
    sortby?: string,
    id?: string,
  ) {
    const logicalOperator = localStorage.getItem('logical_operator');
    let filtersParam = filterObjectForParam(filters);

    setFetching(true);
    dispatch(
      connectorsActions.getConnectorComponent({
        connector_id: id,
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
    dispatch(secretPagesActions.setFetching({ fetching }));
  };

  return {
    setFetching,
    dispatchConnectorComponentsData,
  };
};
