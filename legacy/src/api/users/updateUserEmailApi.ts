import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import { UpdateUser } from '../types';

const updateUserEmailApi = ({
  authenticationToken,
  userId,
  email,
}: {
  authenticationToken: string;
  userId: string;
  email: string;
}): Promise<UpdateUser> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.users.updateUser(userId)),
    method: httpMethods.put,
    authenticationToken,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      email,
    }),
  });

export default updateUserEmailApi;
