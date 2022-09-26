/* eslint-disable */

import { useEffect } from 'react';
import {
  stackPagesActions,
  stacksActions,
  workspacesActions,
} from '../../../../redux/actions';
import {
  stackPagesSelectors,
  workspaceSelectors,
} from '../../../../redux/selectors';
import { useDispatch, useRequestOnMount, useSelector } from '../../../hooks';

interface ServiceInterface {
  setFetching: (arg: boolean) => void;
  setCurrentWorkspace: (arg: TWorkspace | null) => void;
  currentWorkspace: TWorkspace | null;
  workspaces: TWorkspace[];
}

export const useService = (): ServiceInterface => {
  const currentWorkspace = useSelector(stackPagesSelectors.currentWorkspace);

  const dispatch = useDispatch();

  const workspaces = useSelector(workspaceSelectors.myWorkspaces);

  useRequestOnMount(workspacesActions.getMy, {});

  useEffect(() => {
    if (currentWorkspace) {
      setFetching(true);
      dispatch(
        stacksActions.getMy({
          // id: currentWorkspace.id,
          onSuccess: () => setFetching(false),
          onFailure: () => setFetching(false),
        }),
      );
    } else if (workspaces.length > 0) {
      setCurrentWorkspace(workspaces[0]);
    }
  }, []);

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
    workspaces,
  };
};
