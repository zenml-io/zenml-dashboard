import { flavorActionTypes } from '../../actionTypes';
import getFlavorTypeApi from '../../../api/flavors/getFlavorTypeApi';

export const getFlavorTypeAction = (): TRequestAction => ({
  type: flavorActionTypes.getFlavorAll.request,
  payload: {
    apiMethod: getFlavorTypeApi,
    isAuthenticated: true,
    failureActionType: flavorActionTypes.getFlavorType.failure,
    successActionType: flavorActionTypes.getFlavorType.success,
  },
});
