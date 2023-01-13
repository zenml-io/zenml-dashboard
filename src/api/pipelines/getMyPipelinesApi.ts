import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getMyPipelinesApi = ({
  authenticationToken,
  project,
  page,
  size,
  filtersParam,
}: {
  page: number;
  size: number;
  name?: string;
  authenticationToken: string;
  project: string;
  filtersParam?: object;
}): Promise<TPipeline> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.pipelines.my(project)),
    params: { page, size, ...filtersParam },
    method: httpMethods.get,
    authenticationToken,
  });

export default getMyPipelinesApi;
