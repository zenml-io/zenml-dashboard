import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getOrganizationBillingApi = ({
  authenticationToken,
}: {
  authenticationToken: string;
}): Promise<TOrganizationBilling> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.billing.getOrganizationBilling),
    method: httpMethods.get,
    authenticationToken,
  });

export default getOrganizationBillingApi;
