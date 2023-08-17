import { actionTypes } from './constants';
import { generateApiActionsTypes } from './generateApiActionsTypes';

export const flavorActionTypes = {
  getFlavorType: generateApiActionsTypes(actionTypes.FLAVORS_GET_FLAVORS_TYPE),
  getFlavorAll: generateApiActionsTypes(actionTypes.FLAVORS_GET_FLAVORS_ALL),
};
