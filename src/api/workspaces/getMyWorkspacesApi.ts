import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import mockApi from '../mockApiData';

const getMyWorkspacesApi = ({
  authenticationToken,
}: {
  authenticationToken: string;
}): Promise<TWorkspace> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.workspaces.my),
    method: httpMethods.get,
    authenticationToken,
  }).catch((res) => {
    if (process.env.REACT_APP_MOCKAPI_RESPONSE) {
      res = {
        data: mockApi.myWorkSpacesMockResponse,
      };
      return res;
    }
  });

export default getMyWorkspacesApi;
