import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import { Pipeline } from '../types';
const getMyWorkspaceApi = ({
  authenticationToken,
}: {
  authenticationToken: string;
}): Promise<Pipeline[]> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.workspaces.my),
    method: httpMethods.get,
    authenticationToken,
  });

export default getMyWorkspaceApi;
