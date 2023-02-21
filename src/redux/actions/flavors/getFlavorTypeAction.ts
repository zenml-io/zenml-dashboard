import { flavorActionTypes } from '../../actionTypes';
import getFlavorTypeApi from '../../../api/flavors/getFlavorTypeApi';

export const getFlavorTypeAction = ({
  index,
  max_size,
  type,
  name,
  onSuccess,
  onFailure,
}: {
  index?: number;
  max_size?: number;
  type?: string;
  name?: string;
  onSuccess?: (res: any) => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: flavorActionTypes.getFlavorAll.request,
  payload: {
    apiMethod: getFlavorTypeApi,
    isAuthenticated: true,
    failureActionType: flavorActionTypes.getFlavorType.failure,
    successActionType: flavorActionTypes.getFlavorType.success,
    params: {
      type,
      index,
      max_size,
      name,
    },
    onSuccess,
    onFailure,
  },
});
