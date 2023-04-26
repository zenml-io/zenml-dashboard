import { getMySecretsAction } from './getAllRepositories';
import { getRepositoryByIDAction } from './getRepositoryByID';
import { getAllRunsByRepositoryId } from './getRunsByRepositoryID';

export const repositoryActions = {
  getAll: getMySecretsAction,
  getByID: getRepositoryByIDAction,
  getRunsForRepositoryID: getAllRunsByRepositoryId,
};
