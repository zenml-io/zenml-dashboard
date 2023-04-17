import { repositoryActionTypes } from '../actionTypes';

export interface State {
  repositories: any[];
}

export const initialState: State = {
  repositories: [],
};

export type Action = {
  type: string;
  payload: any;
};

function newState(state: State, repositories: any[]) {
  return {
    ...state,
    repositories,
  };
}

function RepositoryReducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case repositoryActionTypes.getRepositories.success:
      return newState(state, action.payload.items);
    default:
      return state;
  }
}

export default RepositoryReducer;
