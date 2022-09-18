import { stackPagesActionTypes } from '../../actionTypes';

const setCurrentWorkspaceAction = ({
  workspace,
}: {
  workspace: TWorkspace | null;
}): TAction => ({
  type: stackPagesActionTypes.setCurrentWorkspace,
  payload: {
    workspace,
  },
});

const setSelectedRunIdsAction = ({ runIds }: { runIds: TId[] }): TAction => ({
  type: stackPagesActionTypes.setSelectedRunIds,
  payload: {
    runIds,
  },
});

const setFetchingAction = ({ fetching }: { fetching: boolean }): TAction => ({
  type: stackPagesActionTypes.setFetching,
  payload: {
    fetching,
  },
});

export const stackPagesActions = {
  setCurrentWorkspace: setCurrentWorkspaceAction,
  setSelectedRunIds: setSelectedRunIdsAction,
  setFetching: setFetchingAction,
};
