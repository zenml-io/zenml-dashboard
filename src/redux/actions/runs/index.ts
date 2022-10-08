import { getRunByIdAction } from './getRunByIdAction';
import { getAllRunsAction } from './getAllRunsAction';
import { getGrpahByRunsIdAction } from './getGrpahByRunsIdAction';

export const runsActions = {
  runForId: getRunByIdAction,
  allRuns: getAllRunsAction,
  graphForRun: getGrpahByRunsIdAction,
};
