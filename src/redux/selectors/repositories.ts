import { Pagination, State } from '../reducers/repositoriesReducer';
import { createSelector } from './createSelector';
import _ from 'lodash';

const stateKey = (state: State) => _.get(state, 'persisted.repositories' || []);

function allRepositories(state: State): TRepository[] {
  if (!state) return [];
  return Object.values(_.get(stateKey(state), 'repositoriesByID'));
}

function repositoryByID(id: string) {
  return createSelector(allRepositories, (repositories) => {
    return repositories.find((repository) => repository.id === id);
  });
}

function getRepositoryPagination(state: State): Pagination {
  if (!state) return {};
  return _.get(stateKey(state), 'pagination');
}

export const repositorySelectors = {
  allRepositories,
  getRepositoryPagination,
  repositoryByID,
};
