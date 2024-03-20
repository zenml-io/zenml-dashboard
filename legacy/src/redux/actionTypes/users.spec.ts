import { userActionTypes } from './users';

import { actionTypes } from './constants';
import { testHelperForActionTypes } from './testUtils/testHelperForActionTypes';

testHelperForActionTypes({
  types: userActionTypes.getMyUser,
  actionType: actionTypes.USERS_GET_MY_USER,
});

testHelperForActionTypes({
  types: userActionTypes.getUserForId,
  actionType: actionTypes.USERS_GET_USER_FOR_ID,
});
