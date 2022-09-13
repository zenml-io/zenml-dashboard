import { pipelinePagesActionTypes } from '../../actionTypes';

const setCurrentWorkspaceAction = ({
  workspace,
}: {
  workspace: TWorkspace | null;
}): TAction => ({
  type: pipelinePagesActionTypes.setCurrentWorkspace,
  payload: {
    workspace,
  },
});

const setSelectedRunIdsAction = ({ runIds }: { runIds: TId[] }): TAction => ({
  type: pipelinePagesActionTypes.setSelectedRunIds,
  payload: {
    runIds,
  },
});

const setFetchingAction = ({ fetching }: { fetching: boolean }): TAction => ({
  type: pipelinePagesActionTypes.setFetching,
  payload: {
    fetching,
  },
});

export const pipelinePagesActions = {
  setCurrentWorkspace: setCurrentWorkspaceAction,
  setSelectedRunIds: setSelectedRunIdsAction,
  setFetching: setFetchingAction,
};
