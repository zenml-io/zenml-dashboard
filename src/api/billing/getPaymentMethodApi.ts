import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getPaymentMethodApi = ({
  authenticationToken,
}: {
  authenticationToken: string;
}): Promise<TPaymentMethod> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.billing.getPaymentMethod),
    method: httpMethods.get,
    authenticationToken,
  });

export default getPaymentMethodApi;
