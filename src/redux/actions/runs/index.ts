import { getRunByIdAction } from './getRunByIdAction';
import { getAllRunsAction } from './getAllRunsAction';
import { getGrpahByRunsIdAction } from './getGrpahByRunsIdAction';
import { getArtifactData } from './getArtifactData';
import { getStepData } from './getStepData';
// import { setRunDetails } from './setRunDetails';

export const runsActions = {

  // runDetails: setRunDetails,
  getStep:getStepData,
  getArtifact: getArtifactData,
  runForId: getRunByIdAction,
  allRuns: getAllRunsAction,
  graphForRun: getGrpahByRunsIdAction,
};
