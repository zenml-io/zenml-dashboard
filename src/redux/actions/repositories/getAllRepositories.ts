import { repositoryActionTypes } from '../../actionTypes';
import getAllRepositories from '../../../api/repositories/getAllRepositories';

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
  type: repositoryActionTypes.getRepositories.request,
  payload: {
    apiMethod: getAllRepositories,
    isAuthenticated: true,
    failureActionType: repositoryActionTypes.getRepositories.failure,
    successActionType: repositoryActionTypes.getRepositories.success,
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
