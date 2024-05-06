import { runPagesActionTypes } from '../../actionTypes';

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
  setSelectedRunIds: setSelectedRunIdsAction,
  setFetching: setFetchingAction,
};
