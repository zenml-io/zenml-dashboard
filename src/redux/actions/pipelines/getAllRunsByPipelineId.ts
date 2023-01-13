import { pipelineActionTypes } from '../../actionTypes';
import getAllRunsByPipelineIdApi from '../../../api/pipelines/getAllRunsByPipelineIdApi';

export const getAllRunsByPipelineId = ({
  pipelineId,
  page,
  size,
  filtersParam,
  onSuccess,
  onFailure,
}: {
  pipelineId: TId;
  page: number;
  size: number;
  filtersParam?: any;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => {
  return {
    type: pipelineActionTypes.getRunsByPipelineId.request,
    payload: {
      apiMethod: getAllRunsByPipelineIdApi,
      isAuthenticated: true,
      failureActionType: pipelineActionTypes.getRunsByPipelineId.failure,
      successActionType: pipelineActionTypes.getRunsByPipelineId.success,
      params: { pipelineId, page, size, filtersParam },
      onSuccess,
      onFailure,
    },
  };
};
