import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import { Workspace } from '../types';
const getMyWorkspaceApi = ({
  authenticationToken,
}: {
  authenticationToken: string;
}): Promise<Workspace[]> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.workspaces.my),
    method: httpMethods.get,
    authenticationToken,
  });

export default getMyWorkspaceApi;
