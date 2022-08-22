import { billingActionTypes } from './billing';

import { actionTypes } from './constants';
import { testHelperForActionTypes } from './testUtils/testHelperForActionTypes';

testHelperForActionTypes({
  types: billingActionTypes.getBillingForRunId,
  actionType: actionTypes.BILLING_GET_BILLING_FOR_RUN_ID,
});
