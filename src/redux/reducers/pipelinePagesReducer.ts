import { pipelinePagesActionTypes } from '../actionTypes';

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

const pipelinePagesReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case pipelinePagesActionTypes.setCurrentWorkspace: {
      const currentWorkspace = action.payload.workspace;

      if (currentWorkspace === undefined) {
        return state;
      }

      return { ...state, currentWorkspace };
    }

    case pipelinePagesActionTypes.setSelectedRunIds: {
      const selectedRunIds = action.payload.runIds;

      if (selectedRunIds === undefined) {
        return state;
      }

      return { ...state, selectedRunIds };
    }

    case pipelinePagesActionTypes.setFetching: {
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

export default pipelinePagesReducer;
