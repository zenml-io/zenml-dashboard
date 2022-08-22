import { stripeActionTypes } from '../../actionTypes';
import getPaymentMethodApi from '../../../api/billing/getPaymentMethodApi';

export const getPaymentMethodAction = ({
  onSuccess,
  onFailure,
}: {
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: stripeActionTypes.getPaymentMethod.request,
  payload: {
    apiMethod: getPaymentMethodApi,
    isAuthenticated: true,
    failureActionType: stripeActionTypes.getPaymentMethod.failure,
    successActionType: stripeActionTypes.getPaymentMethod.success,
    onSuccess,
    onFailure,
  },
});
