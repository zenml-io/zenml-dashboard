import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const inviteApi = ({
  authenticationToken,
  name,
  is_admin,
}: {
  authenticationToken: string;
  name: string;
  is_admin: boolean;
}): Promise<void> =>
  fetchApiWithAuthRequest({
    url: apiUrl(`${endpoints.organizations.invite}?assign_default_role=false`),
    method: httpMethods.post,
    authenticationToken,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      name,
      is_admin,
    }),
  });

export default inviteApi;
