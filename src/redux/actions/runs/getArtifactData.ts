import { runActionTypes } from '../../actionTypes';
import getArtifactDataApi from '../../../api/runs/getRunDataApi';

export const getArtifactData = ({
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
      apiMethod: getArtifactDataApi,
      isAuthenticated: true,
      failureActionType: runActionTypes.getArtifact.failure,
      successActionType: runActionTypes.getArtifact.success,
      params: { exe_id },
      onSuccess,
      onFailure,
    },
  }
};
