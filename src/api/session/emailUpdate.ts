import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const emailUpdate = ({
  userId,
  email,
  name,
  authenticationToken,
}: {
  userId: string,
  email: string
  name: string;
  authenticationToken: string;
}): Promise<TUser> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.users.updateUser(userId)),
    method: httpMethods.put,
    authenticationToken,
    headers: {
      'Content-Type': 'application/json',
    },
    data: { email, name },
  });

export default emailUpdate;