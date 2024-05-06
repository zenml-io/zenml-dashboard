import { rolesActionTypes } from '../../actionTypes';
import getRolesApi from '../../../api/roles/getRolesApi';

export const getRolesAction = ({
  onSuccess,
  onFailure,
}: {
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: rolesActionTypes.getRoles.request,
  payload: {
    apiMethod: getRolesApi,
    isAuthenticated: true,
    failureActionType: rolesActionTypes.getRoles.failure,
    successActionType: rolesActionTypes.getRoles.success,
    onSuccess,
    onFailure,
  },
});
