import { getMyProjectsAction } from './getMyProjectsAction';
import { getMyProjectStatsAction } from './getMyProjectStatsAction';
import { getSelectedProjectAction } from './getSelectedProjectAction';
export const projectsActions = {
  getMy: getMyProjectsAction,
  getMyProjectStats: getMyProjectStatsAction,
  getSelectedProject: getSelectedProjectAction,
};
