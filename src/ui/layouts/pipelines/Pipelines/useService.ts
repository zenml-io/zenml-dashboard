/* eslint-disable */

import { useEffect } from 'react';
import {
  pipelinePagesActions,
  runsActions,
  pipelinesActions,
} from '../../../../redux/actions';
import {
  pipelinePagesSelectors,
  workspaceSelectors,
} from '../../../../redux/selectors';
import { useDispatch, useRequestOnMount, useSelector } from '../../../hooks';

interface ServiceInterface {
  setFetching: (arg: boolean) => void;
  setCurrentWorkspace: (arg: TWorkspace | null) => void;
  currentWorkspace: TWorkspace | null;
}

export const useService = (): ServiceInterface => {
  const currentWorkspace = useSelector(pipelinePagesSelectors.currentWorkspace);

  const dispatch = useDispatch();

  useEffect(() => {
    setFetching(true);
    console.log('asdasdasdasd');
    dispatch(
      runsActions.allRuns({
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
    dispatch(
      pipelinesActions.getMy({
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  });

  const setFetching = (fetching: boolean) => {
    dispatch(pipelinePagesActions.setFetching({ fetching }));
  };

  const setCurrentWorkspace = (workspace: TWorkspace | null) => {
    dispatch(pipelinePagesActions.setCurrentWorkspace({ workspace }));
  };

  return {
    setFetching,
    setCurrentWorkspace,
    currentWorkspace,
  };
};
