import { organizationActionTypes } from '../../actionTypes';
import getMembersApi from '../../../api/organizations/getMembersApi';

export const getMembersAction = ({
  onSuccess,
  onFailure,
}: {
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: organizationActionTypes.getMembers.request,
  payload: {
    apiMethod: getMembersApi,
    isAuthenticated: true,
    failureActionType: organizationActionTypes.getMembers.failure,
    successActionType: organizationActionTypes.getMembers.success,
    onSuccess,
    onFailure,
  },
});
