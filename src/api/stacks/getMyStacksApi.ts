import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getMyStacksApi = ({
  project,
  page,
  size,
  filtersParam,
  authenticationToken,
}: {
  project: string;
  page: number;
  size: number;
  filtersParam?: object;
  authenticationToken: string;
}): Promise<TStack> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.Stacks.my(project)),
    params: { page, size, ...filtersParam },
    method: httpMethods.get,
    authenticationToken,
  });

export default getMyStacksApi;
