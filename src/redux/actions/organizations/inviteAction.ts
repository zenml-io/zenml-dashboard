import { organizationActionTypes } from '../../actionTypes';
import inviteApi from '../../../api/organizations/inviteApi';

export const inviteAction = ({
  email,
  onFailure,
  onSuccess,
}: {
  email: string;
  onFailure?: (err: any) => void;
  onSuccess?: () => void;
}): TRequestAction => ({
  type: organizationActionTypes.invite.request,
  payload: {
    apiMethod: inviteApi,
    isAuthenticated: true,
    failureActionType: organizationActionTypes.invite.failure,
    successActionType: organizationActionTypes.invite.success,
    params: { email },
    onFailure,
    onSuccess,
  },
});
