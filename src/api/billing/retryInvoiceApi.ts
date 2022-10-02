import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const retryInvoiceApi = ({
  invoiceId,
  paymentMethodId,
  authenticationToken,
}: {
  invoiceId: TId;
  paymentMethodId: TId;
  authenticationToken: string;
}): Promise<TOrganization> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.billing.retryInvoice(invoiceId, paymentMethodId)),
    method: httpMethods.post,
    authenticationToken,
  });

export default retryInvoiceApi;
