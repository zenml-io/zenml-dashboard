import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getUserByIdApi = ({
  authenticationToken,
  userId,
}: {
  authenticationToken: string;
  userId: TId;
}): Promise<TOrganization> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.users.get(userId)),
    method: httpMethods.get,
    authenticationToken,
  });

export default getUserByIdApi;
