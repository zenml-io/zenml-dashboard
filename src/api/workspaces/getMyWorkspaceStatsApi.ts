import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

interface WorkspaceStats {}

const getMyWorkspaceStatsApi = ({
  authenticationToken,
  workspace,
}: {
  authenticationToken: string;
  workspace: string;
}): Promise<WorkspaceStats> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.workspaces.stats(workspace)),
    method: httpMethods.get,
    authenticationToken,
  });

export default getMyWorkspaceStatsApi;