import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import mockApi from '../mockApiData';

const getAllRunsByStackIdApi = ({
  authenticationToken,
  stackId,
}: {
  authenticationToken: string;
  stackId: TId;
}): Promise<TOrganization> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.runs.stack.get(stackId)), // todo: get runs by pipeline id please update endpoint
    method: httpMethods.get,
    authenticationToken,
  });

export default getAllRunsByStackIdApi;
