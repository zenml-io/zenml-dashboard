import { stackComponentPagesActionTypes } from '../actionTypes';

export interface State {
  selectedRunIds: TId[];
  fetching: boolean;
}

export const initialState: State = {
  selectedRunIds: [],
  fetching: false,
};

export type Action = {
  type: string;
  payload: {
    runIds?: TId[];
    fetching?: boolean;
  };
};

const stackComponentPagesReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case stackComponentPagesActionTypes.setSelectedRunIds: {
      const selectedRunIds = action.payload.runIds;

      if (selectedRunIds === undefined) {
        return state;
      }

      return { ...state, selectedRunIds };
    }

    case stackComponentPagesActionTypes.setFetching: {
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

export default stackComponentPagesReducer;
