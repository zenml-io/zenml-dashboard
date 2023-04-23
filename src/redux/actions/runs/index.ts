import { getRunByIdAction } from './getRunByIdAction';
import { getAllRunsAction } from './getAllRunsAction';
import { getGrpahByRunsIdAction } from './getGrpahByRunsIdAction';
import { getArtifactData } from './getArtifactData';
import { getStepData } from './getStepData';
import { getArtifactVisualization } from './getArtifactVisualization';

export const runsActions = {
  getVisualization: getArtifactVisualization,
  getStep: getStepData,
  getArtifact: getArtifactData,
  runForId: getRunByIdAction,
  allRuns: getAllRunsAction,
  graphForRun: getGrpahByRunsIdAction,
};
