import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const updatePaymentMethodApi = ({
  authenticationToken,
  id,
}: {
  authenticationToken: string;
  id: TId;
}): Promise<void> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.billing.updatePaymentMethod(id)),
    method: httpMethods.put,
    authenticationToken,
  });

export default updatePaymentMethodApi;
