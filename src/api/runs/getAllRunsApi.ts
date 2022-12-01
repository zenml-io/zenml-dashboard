import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getAllRunsApi = ({
  project,
  authenticationToken,
}: {
  project: string;
  authenticationToken: string;
}): Promise<TOrganization> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.runs.all(project)),
    method: httpMethods.get,
    authenticationToken,
  });

export default getAllRunsApi;
