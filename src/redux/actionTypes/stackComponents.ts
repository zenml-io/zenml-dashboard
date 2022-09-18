import { actionTypes } from './constants';
import { generateApiActionsTypes } from './generateApiActionsTypes';

export const stackComponentActionTypes = {
  getStackComponentTypes: generateApiActionsTypes(
    actionTypes.STACKCOMPONENTS_GET_STACKCOMPONENTS_TYPE,
  ),
  getMyStackComponents: generateApiActionsTypes(
    actionTypes.STACKCOMPONENTS_GET_MY_STACKCOMPONENTS,
  ),
  getStackComponentForId: generateApiActionsTypes(
    actionTypes.STACKCOMPONENTS_GET_STACKCOMPONENT_FOR_ID,
  ),
  getRunsByStackComponentId: generateApiActionsTypes(
    actionTypes.RUNS_GET_STACKCOMPONENT_FOR_ID,
  ),
};
