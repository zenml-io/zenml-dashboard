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
}

export const useService = (): ServiceInterface => {
  const locationPath = useLocationPath();

  const dispatch = useDispatch();

  useEffect(() => {
    setFetching(true);
    dispatch(
      stackComponentsActions.getMy({
        type: locationPath.split('/')[2],
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
  };
};
