import { workspacePagesActionTypes } from '../actionTypes';

export interface State {
  fetching: boolean;
}

export const initialState: State = {
  fetching: false,
};

export type Action = {
  type: string;
  payload: {
    fetching?: boolean;
  };
};

const workspacePagesReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {

    case workspacePagesActionTypes.setFetching: {
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

export default workspacePagesReducer;
