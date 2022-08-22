import { pipelineActionTypes } from '../../actionTypes';
import getPipelineByIdApi from '../../../api/pipelines/getPipelineByIdApi';

export const getPipelineByIdAction = ({
  pipelineId,
  onSuccess,
  onFailure,
}: {
  pipelineId: TId;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: pipelineActionTypes.getPipelineForId.request,
  payload: {
    apiMethod: getPipelineByIdApi,
    isAuthenticated: true,
    failureActionType: pipelineActionTypes.getPipelineForId.failure,
    successActionType: pipelineActionTypes.getPipelineForId.success,
    params: { pipelineId },
    onSuccess,
    onFailure,
  },
});
