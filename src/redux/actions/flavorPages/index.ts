import { flavorPagesActionTypes } from '../../actionTypes';

const setSelectedRunIdsAction = ({ runIds }: { runIds: TId[] }): TAction => ({
  type: flavorPagesActionTypes.setSelectedRunIds,
  payload: {
    runIds,
  },
});

const setFetchingAction = ({ fetching }: { fetching: boolean }): TAction => ({
  type: flavorPagesActionTypes.setFetching,
  payload: {
    fetching,
  },
});

export const flavorPagesActions = {
  setSelectedRunIds: setSelectedRunIdsAction,
  setFetching: setFetchingAction,
};
