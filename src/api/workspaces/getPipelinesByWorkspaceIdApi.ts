import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

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
  });

export default getPipelinesByWorkspaceIdApi;
