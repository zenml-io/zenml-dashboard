import { organizationActionTypes } from '../../actionTypes';
import getInvitesApi from '../../../api/organizations/getInvitesApi';

export const getInvitesAction = ({
  onSuccess,
  onFailure,
}: {
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: organizationActionTypes.getInvites.request,
  payload: {
    apiMethod: getInvitesApi,
    isAuthenticated: true,
    failureActionType: organizationActionTypes.getInvites.failure,
    successActionType: organizationActionTypes.getInvites.success,
    onSuccess,
    onFailure,
  },
});
