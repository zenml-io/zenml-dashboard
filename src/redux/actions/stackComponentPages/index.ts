import { stackPagesActionTypes } from '../../actionTypes';

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

export const stackComponentPagesActions = {
  setSelectedRunIds: setSelectedRunIdsAction,
  setFetching: setFetchingAction,
};
