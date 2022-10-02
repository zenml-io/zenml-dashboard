import { stripeActionTypes } from '../../actionTypes';
import updatePaymentMethodApi from '../../../api/billing/updatePaymentMethodApi';

export const updatePaymentMethodAction = ({
  id,
  onSuccess,
  onFailure,
}: {
  id: TId | undefined;
  onSuccess?: () => void;
  onFailure?: (error: any) => void;
}): TRequestAction => ({
  type: stripeActionTypes.updatePaymentMethod.request,
  payload: {
    apiMethod: updatePaymentMethodApi,
    isAuthenticated: true,
    failureActionType: stripeActionTypes.updatePaymentMethod.failure,
    successActionType: stripeActionTypes.updatePaymentMethod.success,
    params: { id },
    onSuccess,
    onFailure,
  },
});
