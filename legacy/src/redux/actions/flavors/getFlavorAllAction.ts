import { flavorActionTypes } from '../../actionTypes';
import getFlavorAllApi from '../../../api/flavors/getFlavorAllApi';

export const getFlavorAllAction = ({
  onSuccess,
  onFailure,
}: {
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: flavorActionTypes.getFlavorAll.request,
  payload: {
    apiMethod: getFlavorAllApi,
    isAuthenticated: true,
    failureActionType: flavorActionTypes.getFlavorAll.failure,
    successActionType: flavorActionTypes.getFlavorAll.success,
    onSuccess,
    onFailure,
  },
});
