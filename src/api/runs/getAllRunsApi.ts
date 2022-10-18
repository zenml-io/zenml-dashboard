import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getAllRunsApi = ({
  authenticationToken,
}: {
  authenticationToken: string;
}): Promise<TOrganization> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.runs.all),
    method: httpMethods.get,
    authenticationToken,
  });

export default getAllRunsApi;
