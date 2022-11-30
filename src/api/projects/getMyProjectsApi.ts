import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getMyProjectApi = ({
  authenticationToken,
}: {
  authenticationToken: string;
}): Promise<TPipeline> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.projects.my),
    method: httpMethods.get,
    authenticationToken,
  });

export default getMyProjectApi;
