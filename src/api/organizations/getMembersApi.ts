import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getMembersApi = ({
  sort_by,
  index,
  max_size,
  name,
  authenticationToken,
}: {
  sort_by?: string;
  index?: number;
  max_size?: number;
  name?: string;
  authenticationToken: string;
}): Promise<TMember[]> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.organizations.members),
    params: { name, max_size, index, sort_by },
    method: httpMethods.get,
    authenticationToken,
  });

export default getMembersApi;
