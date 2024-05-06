import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getInviteByCodeApi = ({
  username,
  authenticationToken,
}: {
  username: string;
  authenticationToken: string;
}): Promise<TOrganization> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.organizations.reGenerateToken(username)),
    method: httpMethods.put,
    authenticationToken,
  });

export default getInviteByCodeApi;
