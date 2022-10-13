import { runPagesActionTypes } from '../../actionTypes';

const setCurrentWorkspaceAction = ({
  workspace,
}: {
  workspace: TWorkspace | null;
}): TAction => ({
  type: runPagesActionTypes.setCurrentWorkspace,
  payload: {
    workspace,
  },
});

const setSelectedRunIdsAction = ({ runIds }: { runIds: TId[] }): TAction => ({
  type: runPagesActionTypes.setSelectedRunIds,
  payload: {
    runIds,
  },
});

const setFetchingAction = ({ fetching }: { fetching: boolean }): TAction => ({
  type: runPagesActionTypes.setFetching,
  payload: {
    fetching,
  },
});

export const runPagesActions = {
  setCurrentWorkspace: setCurrentWorkspaceAction,
  setSelectedRunIds: setSelectedRunIdsAction,
  setFetching: setFetchingAction,
};
