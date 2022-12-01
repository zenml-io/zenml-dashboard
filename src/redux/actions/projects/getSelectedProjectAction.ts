import { projectActionTypes } from '../../actionTypes';

export const getSelectedProjectAction = ({
  allProjects,
  seletecdProject,
}: {
  allProjects: any;
  seletecdProject: any;

  onSuccess?: () => void;
  onFailure?: () => void;
}): any => ({
  type: projectActionTypes.selectProject.success,
  payload: {
    allProjects,
    seletecdProject,
    isAuthenticated: true,
  },
});
