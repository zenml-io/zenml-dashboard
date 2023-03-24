import { actionTypes } from './constants';
import { generateApiActionsTypes } from './generateApiActionsTypes';

export const runActionTypes = {
  setRunsDetails: generateApiActionsTypes(actionTypes.SET_RUNS_DETAILS),
  getAllRuns: generateApiActionsTypes(actionTypes.RUNS_GET_ALL_RUNS),
  getRunForId: generateApiActionsTypes(actionTypes.RUNS_GET_RUN_FOR_ID),
  getGraphForRunId: generateApiActionsTypes(actionTypes.GRAPH_FOR_RUN_ID),
};
