import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getInvoicesApi = ({
  authenticationToken,
}: {
  authenticationToken: string;
}): Promise<string[]> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.organizations.getInvoices),
    method: httpMethods.get,
    authenticationToken,
  });

export default getInvoicesApi;
