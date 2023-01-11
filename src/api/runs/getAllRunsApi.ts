import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getAllRunsApi = ({
  project,
  page,
  size,
  filtersParam,
  authenticationToken,
}: {
  page: number;
  size: number;
  authenticationToken: string;
  project: string;
  filtersParam?: object;
}): Promise<TOrganization> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.runs.all(project)),
    params: { page, size, ...filtersParam },
    method: httpMethods.get,
    authenticationToken,
  });

export default getAllRunsApi;
