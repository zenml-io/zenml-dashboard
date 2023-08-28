/* eslint-disable */

import { useEffect } from 'react';
import {
  connectorsActions,
  flavorPagesActions,
} from '../../../../redux/actions';

import { useDispatch, useLocationPath, useSelector } from '../../../hooks';

import { workspaceSelectors } from '../../../../redux/selectors';

interface ServiceInterface {}

export const useService = (): ServiceInterface => {
  const locationPath = useLocationPath();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const dispatch = useDispatch();

  const url_string = window.location.href;
  const url = new URL(url_string);
  const workspaceName = url.searchParams.get('workspace');
  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );
  const DEFAULT_ITEMS_PER_PAGE = 10;
  useEffect(() => {
    setFetching(true);
    dispatch(
      connectorsActions.getConnectorsTypes({
        page: 1,
        size: ITEMS_PER_PAGE ? ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE,
        type: locationPath.split('/')[4],

        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }, [locationPath, selectedWorkspace]);

  const setFetching = (fetching: boolean) => {
    dispatch(flavorPagesActions.setFetching({ fetching }));
  };

  return {};
};

export const callActionForConnectorsTypesForPagination = () => {
  const locationPath = useLocationPath();
  const dispatch = useDispatch();

  function dispatchConnectorsTypesData(
    page: number,
    size: number,
    type: string,
    search?: string,
  ) {
    setFetching(true);
    dispatch(
      connectorsActions.getConnectorsTypes({
        type,
        page: page,
        size: size,
        connector_type: search,

        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }

  const setFetching = (fetching: boolean) => {
    dispatch(flavorPagesActions.setFetching({ fetching }));
  };

  return {
    setFetching,
    dispatchConnectorsTypesData,
  };
};
