import { flavorActionTypes } from '../../actionTypes';
import getFlavorAllApi from '../../../api/flavors/getFlavorAllApi';

export const getFlavorAllAction = ({
  // sort_by,
  // logical_operator,
  // index,
  // max_size,
  // name,
  // filtersParam,
  // workspace,
  onSuccess,
  onFailure,
}: {
  // sort_by?: string;
  // logical_operator?: string;
  // index?: number;
  // max_size?: number;
  // name?: string;
  // workspace?: string;
  // filtersParam?: object;
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
