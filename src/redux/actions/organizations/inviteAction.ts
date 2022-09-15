import { organizationActionTypes } from '../../actionTypes';
import inviteApi from '../../../api/organizations/inviteApi';

export const inviteAction = ({
  name,
  email,
  onFailure,
  onSuccess,
}: {
  name: string;
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
    params: { name, email },
    onFailure,
    onSuccess,
  },
});
