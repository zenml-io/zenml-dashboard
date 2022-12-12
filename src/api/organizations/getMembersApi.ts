import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getMembersApi = ({
  authenticationToken,
}: {
  authenticationToken: string;
}): Promise<TMember[]> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.organizations.membersWithRole),
    method: httpMethods.get,
    authenticationToken,
  });

export default getMembersApi;
