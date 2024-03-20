import { organizationActionTypes } from '../../actionTypes';
import inviteApi from '../../../api/organizations/inviteApi';

export const inviteAction = ({
  name,
  is_admin,
  onFailure,
  onSuccess,
}: {
  name: string;
  is_admin: boolean;
  onFailure?: (err: any) => void;
  onSuccess?: (res: any) => void;
}): TRequestAction => ({
  type: organizationActionTypes.invite.request,
  payload: {
    apiMethod: inviteApi,
    isAuthenticated: true,
    failureActionType: organizationActionTypes.invite.failure,
    successActionType: organizationActionTypes.invite.success,
    params: { name, is_admin },
    onFailure,
    onSuccess,
  },
});
