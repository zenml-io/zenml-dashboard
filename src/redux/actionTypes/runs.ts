import { actionTypes } from './constants';
import { generateApiActionsTypes } from './generateApiActionsTypes';

export const runActionTypes = {
  getAllRuns: generateApiActionsTypes(actionTypes.RUNS_GET_ALL_RUNS),
  getRunForId: generateApiActionsTypes(actionTypes.RUNS_GET_RUN_FOR_ID),
};
