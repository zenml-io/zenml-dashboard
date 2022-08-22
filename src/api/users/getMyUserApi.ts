import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getMyUserApi = ({
  authenticationToken,
}: {
  authenticationToken: string;
}): Promise<TUser> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.users.me),
    method: httpMethods.get,
    authenticationToken,
  });

export default getMyUserApi;
