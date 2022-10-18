import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getMyOrganizationApi = ({
  authenticationToken,
}: {
  authenticationToken: string;
}): Promise<TOrganization> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.organizations.my),
    method: httpMethods.get,
    authenticationToken,
  });

export default getMyOrganizationApi;
