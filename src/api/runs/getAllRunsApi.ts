import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getAllRunsApi = ({
  workspace,
  sort_by,
  logical_operator,
  index,
  max_size,
  filtersParam,
  authenticationToken,
}: {
  sort_by: string;
  logical_operator: string;
  index: number;
  max_size: number;
  authenticationToken: string;
  workspace: string;
  filtersParam?: object;
}): Promise<TOrganization> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.runs.all(workspace)),
    params: { sort_by, logical_operator, index, max_size, ...filtersParam },
    method: httpMethods.get,
    authenticationToken,
  });

export default getAllRunsApi;
