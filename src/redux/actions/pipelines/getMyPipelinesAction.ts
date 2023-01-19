import { pipelineActionTypes } from '../../actionTypes';
import getMyPipelinesApi from '../../../api/pipelines/getMyPipelinesApi';

export const getMyPipelinesAction = ({
  sort_by,
  logical_operator,
  page,
  size,
  name,
  filtersParam,
  project,
  onSuccess,
  onFailure,
}: {
  sort_by?: string;
  logical_operator?: string;
  page?: number;
  size?: number;
  name?: string;
  project?: string;
  filtersParam?: object;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: pipelineActionTypes.getMyPipelines.request,
  payload: {
    apiMethod: getMyPipelinesApi,
    isAuthenticated: true,
    failureActionType: pipelineActionTypes.getMyPipelines.failure,
    successActionType: pipelineActionTypes.getMyPipelines.success,
    params: {
      project,
      sort_by,
      logical_operator,
      page,
      size,
      name,
      filtersParam,
    },
    onSuccess,
    onFailure,
  },
});
