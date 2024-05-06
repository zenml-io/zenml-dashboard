import { organizationActionTypes } from './organizations';

import { actionTypes } from './constants';
import { testHelperForActionTypes } from './testUtils/testHelperForActionTypes';

testHelperForActionTypes({
  types: organizationActionTypes.getMyOrganization,
  actionType: actionTypes.ORGANIZATIONS_GET_MY_ORGANIZATION,
});
