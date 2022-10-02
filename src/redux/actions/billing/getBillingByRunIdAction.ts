import { billingActionTypes } from '../../actionTypes';
import getBillingByRunIdApi from '../../../api/billing/getBillingByRunIdApi';

export const getBillingByRunIdAction = ({
  runId,
  pipelineId,
  onSuccess,
  onFailure,
}: {
  runId: TId;
  pipelineId: TId;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: billingActionTypes.getBillingForRunId.request,
  payload: {
    apiMethod: getBillingByRunIdApi,
    isAuthenticated: true,
    failureActionType: billingActionTypes.getBillingForRunId.failure,
    successActionType: billingActionTypes.getBillingForRunId.success,
    params: { runId, pipelineId },
    onSuccess,
    onFailure,
  },
});
