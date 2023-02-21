import { pipelineActionTypes } from '../../actionTypes';
import getAllRunsByPipelineIdApi from '../../../api/pipelines/getAllRunsByPipelineIdApi';

export const getAllRunsByPipelineId = ({
  pipelineId,
  sort_by,
  logical_operator,
  index,
  max_size,
  filtersParam,
  onSuccess,
  onFailure,
}: {
  sort_by: string;
  logical_operator: string;
  pipelineId: TId;
  index: number;
  max_size: number;
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
      params: {
        pipelineId,
        sort_by,
        logical_operator,
        index,
        max_size,
        filtersParam,
      },
      onSuccess,
      onFailure,
    },
  };
};
