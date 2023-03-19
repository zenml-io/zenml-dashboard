import { stackComponentActionTypes } from '../../actionTypes';

import getStackComponentByIdApi from '../../../api/stackComponents/getStackComponentByIdApi';

export const getStackComponentByIdAction = ({
  stackComponentId,
  onSuccess,
  onFailure,
}: {
  stackComponentId: TId;
  onSuccess?: (res: any) => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: stackComponentActionTypes.getStackComponentForId.request,
  payload: {
    apiMethod: getStackComponentByIdApi,
    isAuthenticated: true,
    failureActionType: stackComponentActionTypes.getStackComponentForId.failure,
    successActionType: stackComponentActionTypes.getStackComponentForId.success,
    params: { stackComponentId },
    onSuccess,
    onFailure,
  },
});
