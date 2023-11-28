import { flavorActionTypes } from '../../actionTypes';

import getFlavorByIdApi from '../../../api/flavors/getFlavorByIdApi';
import { Flavor } from '../../../api/types';

export const getFlavorByIdAction = ({
  flavorId,
  onSuccess,
  onFailure,
}: {
  flavorId: TId;
  onSuccess?: (res: Flavor) => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: flavorActionTypes.getFlavorById.request,
  payload: {
    apiMethod: getFlavorByIdApi,
    isAuthenticated: true,
    failureActionType: flavorActionTypes.getFlavorById.failure,
    successActionType: flavorActionTypes.getFlavorById.success,
    params: { flavorId },
    onSuccess,
    onFailure,
  },
});
