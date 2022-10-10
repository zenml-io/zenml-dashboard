/* eslint-disable */

import { useEffect } from 'react';
import {
  stackComponentsActions,
  stackPagesActions,
  workspacesActions,
} from '../../../../redux/actions';
import {
  stackPagesSelectors,
  workspaceSelectors,
} from '../../../../redux/selectors';
import {
  useDispatch,
  useLocationPath,
  useRequestOnMount,
  useSelector,
} from '../../../hooks';

interface ServiceInterface {
  setFetching: (arg: boolean) => void;
  setCurrentWorkspace: (arg: TWorkspace | null) => void;
  // currentWorkspace: TWorkspace | null;
  // workspaces: TWorkspace[];
}

export const useService = (): ServiceInterface => {
  const locationPath = useLocationPath();

  // const currentWorkspace = useSelector(stackPagesSelectors.currentWorkspace);

  const dispatch = useDispatch();

  // const workspaces = useSelector(workspaceSelectors.myWorkspaces);

  // useRequestOnMount(workspacesActions.getMy, {});

  useEffect(() => {
    setFetching(true);
    dispatch(
      stackComponentsActions.getMy({
        // id: currentWorkspace.id,
        type: locationPath.split('/')[2],
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }, [locationPath]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.
      dispatch(
        stackComponentsActions.getMy({
          // id: currentWorkspace.id,
          type: locationPath.split('/')[2],
          onSuccess: () => setFetching(false),
          onFailure: () => setFetching(false),
        }),
      );
    }, 10000);

    return () => clearInterval(intervalId);
  });

  const setFetching = (fetching: boolean) => {
    dispatch(stackPagesActions.setFetching({ fetching }));
  };

  const setCurrentWorkspace = (workspace: TWorkspace | null) => {
    dispatch(stackPagesActions.setCurrentWorkspace({ workspace }));

    // if (workspace) {
    //   setFetching(true);
    //   dispatch(
    //     workspacesActions.pipelinesForWorkspaceId({
    //       id: workspace.id,
    //       onSuccess: () => setFetching(false),
    //       onFailure: () => setFetching(false),
    //     }),
    //   );
    // }
  };

  return {
    setFetching,
    setCurrentWorkspace,
    // currentWorkspace,
    // workspaces,
  };
};
