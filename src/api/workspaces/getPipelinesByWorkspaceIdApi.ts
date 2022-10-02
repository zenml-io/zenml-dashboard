import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import mockApi from '../mockApiData';

const getPipelinesByWorkspaceIdApi = ({
  authenticationToken,
  id,
}: {
  authenticationToken: string;
  id: TId;
}): Promise<TPipeline> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.workspaces.pipelinesForId(id)),
    method: httpMethods.get,
    authenticationToken,
  }).catch((res) => {
    if (process.env.REACT_APP_MOCKAPI_RESPONSE) {
      res = {
        data: mockApi.pipelinesByWorkspacesIdMockResponse,
      };
    }
    return res;
  });

export default getPipelinesByWorkspaceIdApi;
