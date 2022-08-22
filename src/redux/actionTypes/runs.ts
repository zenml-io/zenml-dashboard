import { actionTypes } from './constants';
import { generateApiActionsTypes } from './generateApiActionsTypes';

export const runActionTypes = {
  getRunForId: generateApiActionsTypes(actionTypes.RUNS_GET_RUN_FOR_ID),
};
