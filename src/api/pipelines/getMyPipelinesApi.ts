import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getMyPipelinesApi = ({
  authenticationToken,
  project,
}: {
  authenticationToken: string;
  project: string;
}): Promise<TPipeline> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.pipelines.my(project)),
    method: httpMethods.get,
    authenticationToken,
  });

export default getMyPipelinesApi;
