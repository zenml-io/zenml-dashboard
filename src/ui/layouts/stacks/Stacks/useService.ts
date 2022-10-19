/* eslint-disable */

import { useEffect } from 'react';
import { stackPagesActions, stacksActions } from '../../../../redux/actions';
import { stackPagesSelectors } from '../../../../redux/selectors';
import { useDispatch, useSelector, useLocationPath } from '../../../hooks';

interface ServiceInterface {
  setFetching: (arg: boolean) => void;
  setCurrentWorkspace: (arg: TWorkspace | null) => void;
  currentWorkspace: TWorkspace | null;
}

export const useService = (): ServiceInterface => {
  const currentWorkspace = useSelector(stackPagesSelectors.currentWorkspace);
  const locationPath = useLocationPath();
  const dispatch = useDispatch();

  useEffect(() => {
    setFetching(true);
    dispatch(
      stacksActions.getMy({
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }, [locationPath]);

  const setFetching = (fetching: boolean) => {
    dispatch(stackPagesActions.setFetching({ fetching }));
  };

  const setCurrentWorkspace = (workspace: TWorkspace | null) => {
    dispatch(stackPagesActions.setCurrentWorkspace({ workspace }));
  };

  return {
    setFetching,
    setCurrentWorkspace,
    currentWorkspace,
  };
};
