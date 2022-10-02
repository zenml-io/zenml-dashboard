import { stripeActionTypes } from '../../actionTypes';
import getSubscriptionApi from '../../../api/billing/getSubscriptionApi';

export const getSubscriptionAction = ({
  onSuccess,
  onFailure,
}: {
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: stripeActionTypes.getSubscription.request,
  payload: {
    apiMethod: getSubscriptionApi,
    isAuthenticated: true,
    failureActionType: stripeActionTypes.getSubscription.failure,
    successActionType: stripeActionTypes.getSubscription.success,
    onSuccess,
    onFailure,
  },
});
