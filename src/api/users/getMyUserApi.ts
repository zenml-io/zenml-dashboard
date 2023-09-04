import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import { User } from '../types';

const getMyUserApi = ({
  authenticationToken,
}: {
  authenticationToken: string;
}): Promise<User> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.users.me),
    method: httpMethods.get,
    authenticationToken,
  });

export default getMyUserApi;
