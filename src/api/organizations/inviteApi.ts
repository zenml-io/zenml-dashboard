import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const inviteApi = ({
  authenticationToken,
  email,
}: {
  authenticationToken: string;
  email: string;
}): Promise<void> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.organizations.invite),
    method: httpMethods.post,
    authenticationToken,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      email: email,
    }),
  });

export default inviteApi;
