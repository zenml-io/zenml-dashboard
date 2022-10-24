import { pipelinePagesActionTypes } from '../../actionTypes';

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
  setSelectedRunIds: setSelectedRunIdsAction,
  setFetching: setFetchingAction,
};
