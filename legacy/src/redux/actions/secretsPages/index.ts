import { secretPagesActionTypes } from '../../actionTypes';

const setFetchingAction = ({ fetching }: { fetching: boolean }): TAction => ({
  type: secretPagesActionTypes.setFetching,
  payload: {
    fetching,
  },
});

export const secretPagesActions = {
  setFetching: setFetchingAction,
};
