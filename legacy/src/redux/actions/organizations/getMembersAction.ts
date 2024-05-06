import { organizationActionTypes } from '../../actionTypes';
import getMembersApi from '../../../api/organizations/getMembersApi';

export const getMembersAction = ({
  sort_by,
  page,
  size,
  name,
  onSuccess,
  onFailure,
}: {
  sort_by?: string;
  page?: number;
  size?: number;
  name?: string;
  onSuccess?: () => void;
  onFailure?: (err: any) => void;
}): TRequestAction => ({
  type: organizationActionTypes.getMembers.request,
  payload: {
    apiMethod: getMembersApi,
    isAuthenticated: true,
    failureActionType: organizationActionTypes.getMembers.failure,
    successActionType: organizationActionTypes.getMembers.success,
    params: { name, size, page, sort_by },
    onSuccess,
    onFailure,
  },
});
