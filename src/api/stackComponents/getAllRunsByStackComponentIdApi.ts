import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import mockApi from '../mockApiData';

const getAllRunsByStackComponentIdApi = ({
  authenticationToken,
  stackComponentId,
}: {
  authenticationToken: string;
  stackComponentId: TId;
}): Promise<TOrganization> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.Stacks.get(stackComponentId)), // todo: get runs by pipeline id please update endpoint
    method: httpMethods.get,
    authenticationToken,
  }).catch((res) => {
    if (process.env.REACT_APP_MOCKAPI_RESPONSE) {
      res = {
        data: {
          runsByStackComponent: mockApi.allRunsByStackComponentId,
          stackComponentId,
        },
      };
    }
    return res;
  });

export default getAllRunsByStackComponentIdApi;
