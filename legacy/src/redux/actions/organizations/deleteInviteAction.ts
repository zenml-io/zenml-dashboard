import { organizationActionTypes } from '../../actionTypes';
import deleteInviteApi from '../../../api/organizations/deleteInviteApi';

export const deleteInviteAction = ({
  id,
  onFailure,
  onSuccess,
}: {
  id: string;
  onFailure?: (err: any) => void;
  onSuccess?: () => void;
}): TRequestAction => ({
  type: organizationActionTypes.deleteInvite.request,
  payload: {
    apiMethod: deleteInviteApi,
    isAuthenticated: true,
    failureActionType: organizationActionTypes.deleteInvite.failure,
    successActionType: organizationActionTypes.deleteInvite.success,
    params: { id },
    onFailure,
    onSuccess,
  },
});
