import { stackActionTypes } from '../../actionTypes';
import getAllRunsByStackIdApi from '../../../api/stacks/getAllRunsByStackIdApi';

export const getAllRunsByStackId = ({
  pipelineId,
  onSuccess,
  onFailure,
}: {
  pipelineId: TId;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => {
  return {
    type: stackActionTypes.getRunsByStackId.request,
    payload: {
      apiMethod: getAllRunsByStackIdApi,
      isAuthenticated: true,
      failureActionType: stackActionTypes.getRunsByStackId.failure,
      successActionType: stackActionTypes.getRunsByStackId.success,
      params: { pipelineId },
      onSuccess,
      onFailure,
    },
  };
};
