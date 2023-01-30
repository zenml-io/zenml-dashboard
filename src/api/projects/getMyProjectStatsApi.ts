import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

interface ProjectStats {}

const getMyProjectStatsApi = ({
  authenticationToken,
  project,
}: {
  authenticationToken: string;
  project: string;
}): Promise<ProjectStats> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.projects.stats(project)),
    method: httpMethods.get,
    authenticationToken,
  });

export default getMyProjectStatsApi;