import { projectActionTypes } from '../../actionTypes';
import getMyProjectsApi from '../../../api/projects/getMyProjectsApi';

export const getMyProjectsAction = ({
  selectDefault,
  selectedProject,
  onSuccess,
  onFailure,
}: {
  selectedProject?: string;
  selectDefault?: boolean;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: projectActionTypes.getMyProjects.request,
  payload: {
    apiMethod: getMyProjectsApi,
    isAuthenticated: true,
    failureActionType: projectActionTypes.getMyProjects.failure,
    successActionType: projectActionTypes.getMyProjects.success,
    params: { selectDefault, selectedProject },
    onSuccess,
    onFailure,
  },
});
