import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getInvitesApi = ({
  authenticationToken,
}: {
  authenticationToken: string;
}): Promise<TInvite[]> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.organizations.invites),
    method: httpMethods.get,
    authenticationToken,
  });

export default getInvitesApi;
