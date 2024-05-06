import { actionTypes } from './constants';
import { generateApiActionsTypes } from './generateApiActionsTypes';

export const repositoryActionTypes = {
  getRepositories: generateApiActionsTypes(actionTypes.REPOSITORY_GET_ALL),
  getRepositoryByID: generateApiActionsTypes(actionTypes.REPOSITORY_BY_ID),
  getRunsByRepoID: generateApiActionsTypes(
    actionTypes.RUNS_GET_BY_REPOSITORY_ID,
  ),
};
