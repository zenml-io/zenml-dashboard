import { Repository } from '../../api/types';
import { repositoryActionTypes } from '../actionTypes';
import { byKeyInsert, idsInsert } from './reducerHelpers';

export interface Pagination {
  index?: number;
  max_size?: number;
  total_pages?: number;
  total?: number;
}

export interface State {
  ids: string[];
  repositoriesByID: Record<string, Repository>;
  pagination: Pagination;
  myRepositoryIds: string[];
}

export const initialState: State = {
  ids: [],
  repositoriesByID: {},
  myRepositoryIds: [],
  pagination: {},
};

export type Action = {
  type: string;
  payload: any;
};

function newState(
  state: State,
  repositories: Repository[],
  pagination?: any,
): State {
  return {
    ...state,
    ids: idsInsert(state.ids, repositories),
    repositoriesByID: byKeyInsert(state.repositoriesByID, repositories),
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
      const repos: any[] = action.payload.items;
      const myRepositoryIds = repos.map((repo) => repo.id);
      return { ...newState(state, repos, action.payload), myRepositoryIds };
    case repositoryActionTypes.getRepositoryByID.success:
      return { ...state, ...newState(state, [action.payload]) };
    default:
      return state;
  }
}

export default RepositoryReducer;
