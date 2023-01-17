import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getMembersApi = ({
  sort_by,
  page,
  size,
  name,
  authenticationToken,
}: {
  sort_by?: string;
  page?: number;
  size?: number;
  name?: string;
  authenticationToken: string;
}): Promise<TMember[]> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.organizations.members),
    params: { name, size, page, sort_by },
    method: httpMethods.get,
    authenticationToken,
  });

export default getMembersApi;
