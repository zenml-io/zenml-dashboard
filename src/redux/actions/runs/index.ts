import { getRunByIdAction } from './getRunByIdAction';
import { getAllRunsAction } from './getAllRunsAction';
import { getGrpahByRunsIdAction } from './getGrpahByRunsIdAction';
import { setRunDetails } from './setRunDetails';

export const runsActions = {
  setRunDetails,
  runForId: getRunByIdAction,
  allRuns: getAllRunsAction,
  graphForRun: getGrpahByRunsIdAction,
};
