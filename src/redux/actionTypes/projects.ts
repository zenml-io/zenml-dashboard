import { actionTypes } from './constants';
import { generateApiActionsTypes } from './generateApiActionsTypes';

export const projectActionTypes = {
  getMyProjects: generateApiActionsTypes(actionTypes.PROJECTS_GET_MY_PROJECTS),
  getMyProjectStats: generateApiActionsTypes(actionTypes.GET_MY_PROJECT_STATS),
  selectProject: generateApiActionsTypes(
    actionTypes.SELECT_PROJECT_FROM_MY_PROJECTS,
  ),
};
