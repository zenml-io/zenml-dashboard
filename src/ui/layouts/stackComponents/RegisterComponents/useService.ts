/* eslint-disable */

import { useEffect } from 'react';
import { flavorsActions, flavorPagesActions } from '../../../../redux/actions';
// import { workspaceSelectors } from '../../../../redux/selectors';
import { useDispatch, useLocationPath, useSelector } from '../../../hooks';
import { DEFAULT_WORKSPACE_NAME } from '../../../../constants';
import { workspaceSelectors } from '../../../../redux/selectors';
import { filterObjectForParam } from '../../../../utils';

interface ServiceInterface {
  setFetching: (arg: boolean) => void;
}

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
    if (locationPath.split('/')[4] === 'all_components') {
      dispatch(
        flavorsActions.getAll({
          onSuccess: () => setFetching(false),
          onFailure: () => setFetching(false),
        }),
      );
    } else {
      dispatch(
        flavorsActions.getType({
          page: 1,
          size: 7,
          type: locationPath.split('/')[4],
          onSuccess: () => setFetching(false),
          onFailure: () => setFetching(false),
        }),
      );
    }
  }, [locationPath, selectedWorkspace]);

  const setFetching = (fetching: boolean) => {
    dispatch(flavorPagesActions.setFetching({ fetching }));
  };

  return {
    setFetching,
  };
};

export const callActionForFlavorsForPagination = () => {
  const locationPath = useLocationPath();
  const dispatch = useDispatch();

  function dispatchFlavorsData(page: number, size: number, type: string) {
    setFetching(true);
    dispatch(
      flavorsActions.getType({
        type,
        page: page,
        size: size,
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
    dispatchFlavorsData,
  };
};
