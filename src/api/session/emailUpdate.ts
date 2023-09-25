import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import { UpdateUser } from '../types';

const emailUpdate = ({
  userId,
  fullName,
  name,
  authenticationToken,
}: {
  userId: string;
  fullName: string;
  name: string;
  authenticationToken: string;
}): Promise<UpdateUser> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.users.updateUser(userId)),
    method: httpMethods.put,
    authenticationToken,
    headers: {
      'Content-Type': 'application/json',
    },
    data: { full_name: fullName, name },
  });

export default emailUpdate;
