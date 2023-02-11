import { flavorActionTypes } from '../../actionTypes';
import getFlavorTypeApi from '../../../api/flavors/getFlavorTypeApi';

export const getFlavorTypeAction = ({
  page,
  size,
  type,
  name,
  onSuccess,
  onFailure,
}: {
  page: number;
  size: number;
  type: string;
  name?: string;
  onSuccess?: () => void;
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
      page,
      size,
      name,
    },
    onSuccess,
    onFailure,
  },
});
