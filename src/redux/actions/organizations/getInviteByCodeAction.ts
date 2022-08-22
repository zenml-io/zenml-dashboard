import { organizationActionTypes } from '../../actionTypes';
import getInviteByCodeApi from '../../../api/organizations/getInviteByCodeApi';

export const getInviteByCodeAction = ({
  code,
  onSuccess,
  onFailure,
}: {
  code: string | null;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: organizationActionTypes.getInviteForCode.request,
  payload: {
    apiMethod: getInviteByCodeApi,
    isAuthenticated: true,
    failureActionType: organizationActionTypes.getInviteForCode.failure,
    successActionType: organizationActionTypes.getInviteForCode.success,
    params: { code },
    onSuccess,
    onFailure,
  },
});
