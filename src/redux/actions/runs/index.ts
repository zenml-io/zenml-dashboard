// import { getAllRunsByPipelineId } from '../pipelines/getAllRunsByPipelineId';
import { getRunByIdAction } from './getRunByIdAction';
import { getAllRunsAction } from './getAllRunsAction';

export const runsActions = {
  runForId: getRunByIdAction,
  allRuns: getAllRunsAction,
};
