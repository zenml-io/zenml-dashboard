import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const updateSubscriptionApi = ({
  authenticationToken,
  id,
}: {
  authenticationToken: string;
  id: TSubscriptionPlanType;
}): Promise<void> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.billing.updateSubscription(id)),
    method: httpMethods.put,
    authenticationToken,
  });

export default updateSubscriptionApi;
