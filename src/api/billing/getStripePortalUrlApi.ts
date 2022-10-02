import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getStripePortalUrlApi = ({
  authenticationToken,
}: {
  authenticationToken: string;
}): Promise<TWorkspace> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.billing.my),
    method: httpMethods.get,
    authenticationToken,
  });

export default getStripePortalUrlApi;
