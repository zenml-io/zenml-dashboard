import { actionTypes } from './constants';
import { generateApiActionsTypes } from './generateApiActionsTypes';

export const stackComponentActionTypes = {
  getMyStacks: generateApiActionsTypes(actionTypes.STACKS_GET_MY_STACKS),
  getStackForId: generateApiActionsTypes(actionTypes.STACKS_GET_STACK_FOR_ID),
  getRunsByStackId: generateApiActionsTypes(actionTypes.RUNS_GET_STACK_FOR_ID),
};
