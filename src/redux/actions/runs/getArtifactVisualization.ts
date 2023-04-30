import { runActionTypes } from '../../actionTypes';
import getVisualization from '../../../api/runs/getArtifactVisualization';

export const getArtifactVisualization = ({
  id,
  onSuccess,
  onFailure,
}: {

  id: TId;
  onSuccess?: () => void;
  onFailure?: () => void;

}): TRequestAction => {
  console.log("api action", id)
  return {
    type: runActionTypes.getArtifactVisualization.request,
    payload: {
      apiMethod: getVisualization,
      isAuthenticated: true,
      failureActionType: runActionTypes.getArtifactVisualization.failure,
      successActionType: runActionTypes.getArtifactVisualization.success,
      params: { id },
      onSuccess,
      onFailure,
    },
  }
};
