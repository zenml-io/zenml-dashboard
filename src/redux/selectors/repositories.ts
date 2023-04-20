import { Pagination, State } from '../reducers/repositoriesReducer';
import { createSelector } from './createSelector';
import _ from 'lodash';
import { extractItemFromById } from './utils';

const stateKey = (state: State): State =>
  _.get(state, 'persisted.repositories' || []);

const getByID = (state: State): Record<string, TRepository> =>
  _.get(stateKey(state), 'repositoriesByID');
const getMyRepoIds = (state: State): string[] =>
  _.get(stateKey(state), 'myRepositoryIds');

function allRepositories(state: State) {
  if (!state) return [];
  const myRepoIDs = getMyRepoIds(state);
  const repos = getByID(state);

  return myRepoIDs.reduce((current: TRepository[], id: string) => {
    const repo = repos[id];

    if (repo) {
      current = [...current, repo];
    }

    return current;
  }, []);
}

function repositoryByID(id: string) {
  return createSelector(getByID, extractItemFromById(id));
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
