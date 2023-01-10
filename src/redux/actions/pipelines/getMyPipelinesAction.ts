import { pipelineActionTypes } from '../../actionTypes';
import getMyPipelinesApi from '../../../api/pipelines/getMyPipelinesApi';

export const getMyPipelinesAction = ({
  page,
  size,
  project,
  onSuccess,
  onFailure,
}: {
  page: number;
  size: number;
  project: string;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: pipelineActionTypes.getMyPipelines.request,
  payload: {
    apiMethod: getMyPipelinesApi,
    isAuthenticated: true,
    failureActionType: pipelineActionTypes.getMyPipelines.failure,
    successActionType: pipelineActionTypes.getMyPipelines.success,
    params: { project, page, size },
    onSuccess,
    onFailure,
  },
});
