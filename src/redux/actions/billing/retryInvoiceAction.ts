import { organizationActionTypes } from '../../actionTypes';
import retryInvoiceApi from '../../../api/billing/retryInvoiceApi';

export const retryInvoiceAction = ({
  invoiceId,
  paymentMethodId,
  onSuccess,
  onFailure,
}: {
  invoiceId: TId | undefined;
  paymentMethodId: TId | undefined;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: organizationActionTypes.retryInvoice.request,
  payload: {
    apiMethod: retryInvoiceApi,
    isAuthenticated: true,
    failureActionType: organizationActionTypes.retryInvoice.failure,
    successActionType: organizationActionTypes.retryInvoice.success,
    params: { invoiceId, paymentMethodId },
    onSuccess,
    onFailure,
  },
});
