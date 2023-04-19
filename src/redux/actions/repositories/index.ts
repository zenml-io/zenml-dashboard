import { getMySecretsAction } from './getAllRepositories';
import { getRepositoryByIDAction } from './getRepositoryByID';

export const repositoryActions = {
  getAll: getMySecretsAction,
  getByID: getRepositoryByIDAction,
};
