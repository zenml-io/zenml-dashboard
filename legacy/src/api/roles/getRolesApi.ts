import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getRolesApi = ({
  authenticationToken,
}: {
  authenticationToken: string;
}): Promise<Roles> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.roles.all),
    method: httpMethods.get,
    authenticationToken,
  });

export default getRolesApi;
