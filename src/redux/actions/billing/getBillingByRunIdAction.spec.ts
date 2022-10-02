import { billingActionTypes } from '../../actionTypes';
import getBillingByRunIdApi from '../../../api/billing/getBillingByRunIdApi';

import { testApiAction } from '../testUtils/testApiAction';
import { getBillingByRunIdAction } from './getBillingByRunIdAction';

const runId = 'runId';
const pipelineId = 'pipelineId';

const onSuccess = jest.fn();
const onFailure = jest.fn();

export const onAction = (): any =>
  getBillingByRunIdAction({ pipelineId, runId, onSuccess, onFailure });

testApiAction({
  onAction,
  type: billingActionTypes.getBillingForRunId.request,
  payload: {
    apiMethod: getBillingByRunIdApi,
    isAuthenticated: true,
    failureActionType: billingActionTypes.getBillingForRunId.failure,
    successActionType: billingActionTypes.getBillingForRunId.success,
    params: { pipelineId, runId },
    onSuccess,
    onFailure,
  },
});
