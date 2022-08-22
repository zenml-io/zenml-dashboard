import { organizationActionTypes } from '../../actionTypes';
import getInvoicesApi from '../../../api/organizations/getInvoicesApi';

export const getInvoicesAction = ({
  onSuccess,
  onFailure,
}: {
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: organizationActionTypes.getInvoices.request,
  payload: {
    apiMethod: getInvoicesApi,
    isAuthenticated: true,
    failureActionType: organizationActionTypes.getInvoices.failure,
    successActionType: organizationActionTypes.getInvoices.success,
    onSuccess,
    onFailure,
  },
});
