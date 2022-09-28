import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
// import mockApi from '../mockApiData';

const getMyPipelinesApi = ({
  authenticationToken,
}: {
  authenticationToken: string;
}): Promise<TPipeline> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.pipelines.my),
    method: httpMethods.get,
    authenticationToken,
  });

export default getMyPipelinesApi;
