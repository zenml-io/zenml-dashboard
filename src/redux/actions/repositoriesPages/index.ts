import { repositoryPagesActionTypes } from '../../actionTypes';

const setFetchingAction = ({ fetching }: { fetching: boolean }): TAction => ({
  type: repositoryPagesActionTypes.setFetching,
  payload: {
    fetching,
  },
});

export const repositoryPagesActions = {
  setFetching: setFetchingAction,
};
