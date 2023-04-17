import { repositoryActionTypes } from '../actionTypes';

export interface Pagination {
  index?: number;
  max_size?: number;
  total_pages?: number;
  total?: number;
}

interface ActionPayload {
  items: TRepository[];
  index: number;
  max_size: number;
  total_pages: number;
  total: number;
}

export interface State {
  repositories: TRepository[];
  pagination: Pagination;
}

export const initialState: State = {
  repositories: [],
  pagination: {},
};

export type Action = {
  type: string;
  payload: ActionPayload;
};

function newState(
  state: State,
  repositories: TRepository[],
  pagination?: Pagination,
): State {
  return {
    ...state,
    repositories,
    pagination: {
      index: pagination?.index,
      max_size: pagination?.max_size,
      total: pagination?.total,
      total_pages: pagination?.total_pages,
    },
  };
}

function RepositoryReducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case repositoryActionTypes.getRepositories.success:
      return newState(state, action.payload.items, {
        index: action.payload.index,
        max_size: action.payload.max_size,
        total: action.payload.total,
        total_pages: action.payload.total_pages,
      });
    default:
      return state;
  }
}

export default RepositoryReducer;
