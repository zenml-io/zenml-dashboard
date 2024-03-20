import { stackActionTypes } from '../../actionTypes';
import getMyStacksApi from '../../../api/stacks/getMyStacksApi';

export const getMyStacksAction = ({
  component_id,
  workspace,
  sort_by,
  logical_operator,
  page,
  name,
  size,
  filtersParam,

  onSuccess,
  onFailure,
}: {
  component_id?: any;
  name?: string;
  workspace?: string;
  sort_by?: string;
  logical_operator?: string;
  page?: number;
  size?: number;
  filtersParam?: object;

  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: stackActionTypes.getMyStacks.request,
  payload: {
    apiMethod: getMyStacksApi,
    isAuthenticated: true,
    failureActionType: stackActionTypes.getMyStacks.failure,
    successActionType: stackActionTypes.getMyStacks.success,
    params: {
      component_id,
      workspace,
      name,
      sort_by,
      logical_operator,
      page,
      size,
      filtersParam,
    },
    onSuccess,
    onFailure,
  },
});
