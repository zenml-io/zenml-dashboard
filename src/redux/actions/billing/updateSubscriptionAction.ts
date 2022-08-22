import { stripeActionTypes } from '../../actionTypes';
import updateSubscriptionApi from '../../../api/billing/updateSubscriptionApi';

export const updateSubscriptionAction = ({
  id,
  onSuccess,
  onFailure,
}: {
  id: TSubscriptionPlanType;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: stripeActionTypes.updateSubscription.request,
  payload: {
    apiMethod: updateSubscriptionApi,
    isAuthenticated: true,
    failureActionType: stripeActionTypes.updateSubscription.failure,
    successActionType: stripeActionTypes.updateSubscription.success,
    params: { id },
    onSuccess,
    onFailure,
  },
});
