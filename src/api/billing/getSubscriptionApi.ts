import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getSubscriptionApi = ({
  authenticationToken,
}: {
  authenticationToken: string;
}): Promise<TSubscription> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.billing.getSubscription),
    method: httpMethods.get,
    authenticationToken,
  });

export default getSubscriptionApi;
