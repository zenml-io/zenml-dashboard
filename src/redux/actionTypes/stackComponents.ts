import { actionTypes } from './constants';
import { generateApiActionsTypes } from './generateApiActionsTypes';

export const stackComponentActionTypes = {
  getStackComponentTypes: generateApiActionsTypes(
    actionTypes.STACKCOMPONENTS_GET_STACKCOMPONENTS_TYPE,
  ),
  getStackComponentList: generateApiActionsTypes(
    actionTypes.STACKCOMPONENTS_GET_STACKCOMPONENTS_LIST,
  ),
  getStackComponentForId: generateApiActionsTypes(
    actionTypes.STACKCOMPONENTS_GET_STACKCOMPONENT_FOR_ID,
  ),
  getRunsByStackComponentId: generateApiActionsTypes(
    actionTypes.RUNS_GET_STACKCOMPONENT_FOR_ID,
  ),
};
