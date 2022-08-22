import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getInviteByCodeApi = ({
  code,
  authenticationToken,
}: {
  code: string;
  authenticationToken: string;
}): Promise<TOrganization> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.organizations.inviteForCode(code)),
    method: httpMethods.get,
    authenticationToken,
  });

export default getInviteByCodeApi;
