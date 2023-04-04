import { secretActionTypes } from '../../actionTypes';
import getMySecretsApi from '../../../api/secrets/getMySecretsApi';

export const getMySecretsAction = ({
  component_id,
  workspace,
  sort_by,
  logical_operator,
  page,
  name,
  size,
  filtersParam,
  // id,
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
  // id?: any;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: secretActionTypes.getMySecrets.request,
  payload: {
    apiMethod: getMySecretsApi,
    isAuthenticated: true,
    failureActionType: secretActionTypes.getMySecrets.failure,
    successActionType: secretActionTypes.getMySecrets.success,
    params: {
      component_id,
      workspace,
      name,
      sort_by,
      logical_operator,
      page,
      size,
      filtersParam,
      // id,
    },
    onSuccess,
    onFailure,
  },
});
