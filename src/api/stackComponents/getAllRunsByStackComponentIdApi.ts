import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getAllRunsByStackComponentIdApi = ({
  authenticationToken,
  stackComponentId,
}: {
  authenticationToken: string;
  stackComponentId: TId;
}): Promise<TOrganization> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.runs.stackComponent.get(stackComponentId)), // todo: get runs by pipeline id please update endpoint
    method: httpMethods.get,
    authenticationToken,
  });

export default getAllRunsByStackComponentIdApi;
