import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import { Run } from '../types';

const getAllRunsByStackIdApi = ({
  authenticationToken,
  stackId,
  sort_by,
  logical_operator,
  page,
  size,
  filtersParam,
}: {
  sort_by: string;
  logical_operator: string;
  page: number;
  size: number;
  filtersParam?: any;
  authenticationToken: string;
  stackId: TId;
}): Promise<Run> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.runs.stack.get(stackId)),
    params: { sort_by, logical_operator, page, size, ...filtersParam }, // todo: get runs by pipeline id please update endpoint
    method: httpMethods.get,
    authenticationToken,
  });

export default getAllRunsByStackIdApi;
