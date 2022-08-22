import { workspacePagesActionTypes } from '../../actionTypes';

const setFetchingAction = ({ fetching }: { fetching: boolean }): TAction => ({
  type: workspacePagesActionTypes.setFetching,
  payload: {
    fetching,
  },
});

export const workspacePagesActions = {
  setFetching: setFetchingAction,
};
