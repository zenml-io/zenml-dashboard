import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getMembersApi = ({
  name,
  authenticationToken,
}: {
  name?: string;
  authenticationToken: string;
}): Promise<TMember[]> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.organizations.members),
    params: { name, size: 5 },
    method: httpMethods.get,
    authenticationToken,
  });

export default getMembersApi;
