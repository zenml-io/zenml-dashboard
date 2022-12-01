import { actionTypes } from './constants';
import { generateApiActionsTypes } from './generateApiActionsTypes';

export const projectActionTypes = {
  getMyProjects: generateApiActionsTypes(actionTypes.PROJECTS_GET_MY_PROJECTS),
  selectProject: generateApiActionsTypes(
    actionTypes.SELECT_PROJECT_FROM_MY_PROJECTS,
  ),
};
