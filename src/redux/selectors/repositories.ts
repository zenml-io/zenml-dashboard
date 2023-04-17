import { Pagination, State } from '../reducers/repositoriesReducer';
import _ from 'lodash';

const stateKey = (state: State) => _.get(state, 'persisted.repositories' || []);

function allRepositories(state: State): TRepository[] {
  if (!state) return [];
  return _.get(stateKey(state), 'repositories');
}

function getRepositoryPagination(state: State): Pagination {
  if (!state) return {};
  return _.get(stateKey(state), 'pagination');
}

export const repositorySelectors = {
  allRepositories,
  getRepositoryPagination,
};
