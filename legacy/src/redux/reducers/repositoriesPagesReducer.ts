import { repositoryPagesActionTypes } from '../actionTypes';

export interface State {
  fetching: boolean;
}

export const initialState: State = {
  fetching: false,
};

export type Action = {
  type: string;
  payload: {
    runIds?: TId[];
    fetching?: boolean;
  };
};

const repositoryPagesReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case repositoryPagesActionTypes.setFetching: {
      const fetching = action.payload.fetching;

      if (fetching === undefined) {
        return state;
      }

      return { ...state, fetching };
    }

    default:
      return state;
  }
};

export default repositoryPagesReducer;
