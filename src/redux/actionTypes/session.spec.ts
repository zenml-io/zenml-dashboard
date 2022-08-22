import * as sessionActionTypes from './session';

import { actionTypes } from './constants';
import { testHelperForActionTypes } from './testUtils/testHelperForActionTypes';

testHelperForActionTypes({
  types: sessionActionTypes.loginActionTypes,
  actionType: actionTypes.ACCOUNT_LOGIN,
});
