import { pipelineActionTypes } from './pipelines';

import { actionTypes } from './constants';
import { testHelperForActionTypes } from './testUtils/testHelperForActionTypes';

testHelperForActionTypes({
  types: pipelineActionTypes.getMyPipelines,
  actionType: actionTypes.PIPELINES_GET_MY_PIPELINES,
});

testHelperForActionTypes({
  types: pipelineActionTypes.getPipelineForId,
  actionType: actionTypes.PIPELINES_GET_PIPELINE_FOR_ID,
});
