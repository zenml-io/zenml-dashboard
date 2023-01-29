import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getMyWorkspaceApi = ({
  authenticationToken,
}: {
  authenticationToken: string;
}): Promise<TPipeline> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.workspaces.my),
    method: httpMethods.get,
    authenticationToken,
  });

export default getMyWorkspaceApi;
