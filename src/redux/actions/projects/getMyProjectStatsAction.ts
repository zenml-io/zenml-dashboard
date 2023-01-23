import { projectActionTypes } from '../../actionTypes';
import getMyProjectStatsApi from '../../../api/projects/getMyProjectStatsApi';

export const getMyProjectStatsAction = ({
  project,
  onSuccess,
  onFailure,
}: {
  project?: string;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: projectActionTypes.getMyProjectStats.request,
  payload: {
    apiMethod: getMyProjectStatsApi,
    isAuthenticated: true,
    failureActionType: projectActionTypes.getMyProjectStats.failure,
    successActionType: projectActionTypes.getMyProjectStats.success,
    params: { project },
    onSuccess,
    onFailure,
  },
});
