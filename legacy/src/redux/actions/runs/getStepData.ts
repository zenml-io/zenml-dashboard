import { runActionTypes } from '../../actionTypes';
import getStepDataApi from '../../../api/runs/getStepDataApi';

export const getStepData = ({
  exe_id,
  onSuccess,
  onFailure,
}: {
  exe_id: TId;

  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => {
  return {
    type: runActionTypes.getArtifact.request,
    payload: {
      apiMethod: getStepDataApi,
      isAuthenticated: true,
      failureActionType: runActionTypes.getStep.failure,
      successActionType: runActionTypes.getStep.success,
      params: { exe_id },
      onSuccess,
      onFailure,
    },
  };
};
