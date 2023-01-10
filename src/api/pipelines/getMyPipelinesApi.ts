import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getMyPipelinesApi = ({
  authenticationToken,
  project,
  page,
  size,
}: {
  page: number;
  size: number;
  authenticationToken: string;
  project: string;
}): Promise<TPipeline> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.pipelines.my(project, page, size)),
    method: httpMethods.get,
    authenticationToken,
  });

export default getMyPipelinesApi;
