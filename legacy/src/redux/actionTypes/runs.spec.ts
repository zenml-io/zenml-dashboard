import { runActionTypes } from './runs';

import { actionTypes } from './constants';
import { testHelperForActionTypes } from './testUtils/testHelperForActionTypes';

testHelperForActionTypes({
  types: runActionTypes.getRunForId,
  actionType: actionTypes.RUNS_GET_RUN_FOR_ID,
});
