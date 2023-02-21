import { organizationActionTypes } from '../../actionTypes';
import getMembersApi from '../../../api/organizations/getMembersApi';

export const getMembersAction = ({
  sort_by,
  index,
  max_size,
  name,
  onSuccess,
  onFailure,
}: {
  sort_by?: string;
  index?: number;
  max_size?: number;
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
    params: { name, max_size, index, sort_by },
    onSuccess,
    onFailure,
  },
});
