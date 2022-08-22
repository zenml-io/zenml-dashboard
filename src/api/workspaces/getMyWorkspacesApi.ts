import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getMyWorkspacesApi = ({
  authenticationToken,
}: {
  authenticationToken: string;
}): Promise<TWorkspace> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.workspaces.my),
    method: httpMethods.get,
    authenticationToken,
  });

export default getMyWorkspacesApi;
