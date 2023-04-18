import { actionTypes } from './constants';
import { generateApiActionsTypes } from './generateApiActionsTypes';

export const repositoryActionTypes = {
  getRepositories: generateApiActionsTypes(actionTypes.REPOSITORY_GET_ALL),
};