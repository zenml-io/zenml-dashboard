import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getAllRunsByStackIdApi = ({
  authenticationToken,
  stackId,
  sort_by,
  logical_operator,
  index,
  max_size,
  filtersParam,
}: {
  sort_by: string;
  logical_operator: string;
  index: number;
  max_size: number;
  filtersParam?: any;
  authenticationToken: string;
  stackId: TId;
}): Promise<TOrganization> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.runs.stack.get(stackId)),
    params: { sort_by, logical_operator, index, max_size, ...filtersParam }, // todo: get runs by pipeline id please update endpoint
    method: httpMethods.get,
    authenticationToken,
  });

export default getAllRunsByStackIdApi;
