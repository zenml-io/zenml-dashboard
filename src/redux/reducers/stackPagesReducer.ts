import { stackPagesActionTypes } from '../actionTypes';

export interface State {
  currentWorkspace: TWorkspace | null;
  selectedRunIds: TId[];
  fetching: boolean;
}

export const initialState: State = {
  currentWorkspace: null,
  selectedRunIds: [],
  fetching: false,
};

export type Action = {
  type: string;
  payload: {
    workspace?: TWorkspace | null;
    runIds?: TId[];
    fetching?: boolean;
  };
};

const stackPagesReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case stackPagesActionTypes.setCurrentWorkspace: {
      const currentWorkspace = action.payload.workspace;

      if (currentWorkspace === undefined) {
        return state;
      }

      return { ...state, currentWorkspace };
    }

    case stackPagesActionTypes.setSelectedRunIds: {
      const selectedRunIds = action.payload.runIds;

      if (selectedRunIds === undefined) {
        return state;
      }

      return { ...state, selectedRunIds };
    }

    case stackPagesActionTypes.setFetching: {
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

export default stackPagesReducer;
