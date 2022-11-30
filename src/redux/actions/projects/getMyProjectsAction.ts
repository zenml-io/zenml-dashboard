import { projectActionTypes } from '../../actionTypes';
import getMyProjectsApi from '../../../api/projects/getMyProjectsApi';

export const getMyProjectsAction = ({
  onSuccess,
  onFailure,
}: {
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: projectActionTypes.getMyProjects.request,
  payload: {
    apiMethod: getMyProjectsApi,
    isAuthenticated: true,
    failureActionType: projectActionTypes.getMyProjects.failure,
    successActionType: projectActionTypes.getMyProjects.success,
    onSuccess,
    onFailure,
  },
});
