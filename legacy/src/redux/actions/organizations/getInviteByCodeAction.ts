import { organizationActionTypes } from '../../actionTypes';
import getInviteByCodeApi from '../../../api/organizations/getInviteByCodeApi';

export const getInviteByCodeAction = ({
  username,
  onSuccess,
  onFailure,
}: {
  username: string | null;
  onSuccess?: () => void;
  onFailure?: (err: any) => void;
}): TRequestAction => ({
  type: organizationActionTypes.getInviteForCode.request,
  payload: {
    apiMethod: getInviteByCodeApi,
    isAuthenticated: true,
    failureActionType: organizationActionTypes.getInviteForCode.failure,
    successActionType: organizationActionTypes.getInviteForCode.success,
    params: { username },
    onSuccess,
    onFailure,
  },
});
