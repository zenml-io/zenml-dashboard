import { runActionTypes } from '../../actionTypes';
import getStepDataApi from '../../../api/runs/getStepDataApi';

export const getStepData = ({
  exe_id,
  onSuccess,
  onFailure,
}: {
  exe_id: any;

  onSuccess?: () => void;
  onFailure?: () => void;

}): TRequestAction => {
  console.log("__UNAUTH_STEP_ACTION: ", exe_id)
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
  }
};
