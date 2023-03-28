import { actionTypes } from './constants';
import { generateApiActionsTypes } from './generateApiActionsTypes';

export const runActionTypes = {
  // setRunsDetails: generateApiActionsTypes(actionTypes.SET_RUNS_DETAILS),
  getArtifact: generateApiActionsTypes(actionTypes.GET_ARTIFACT_DATA),
  getStep: generateApiActionsTypes(actionTypes.GET_STEP_DATA),
  getAllRuns: generateApiActionsTypes(actionTypes.RUNS_GET_ALL_RUNS),
  getRunForId: generateApiActionsTypes(actionTypes.RUNS_GET_RUN_FOR_ID),
  getGraphForRunId: generateApiActionsTypes(actionTypes.GRAPH_FOR_RUN_ID),
};
