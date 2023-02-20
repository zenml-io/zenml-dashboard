import { actionTypes } from './constants';
import { generateApiActionsTypes } from './generateApiActionsTypes';

export const flavorActionTypes = {
  getFlavorType: generateApiActionsTypes(actionTypes.FLAVORS_GET_FLAVORS_TYPE),
  getFlavorAll: generateApiActionsTypes(actionTypes.FLAVORS_GET_FLAVORS_ALL),
  // getStackComponentForId: generateApiActionsTypes(
  //   actionTypes.STACKCOMPONENTS_GET_STACKCOMPONENT_FOR_ID,
  // ),
  // getRunsByStackComponentId: generateApiActionsTypes(
  //   actionTypes.RUNS_GET_STACKCOMPONENT_FOR_ID,
  // ),
};
