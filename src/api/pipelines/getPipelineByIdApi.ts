import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import mockApi from '../mockApiData';

const getPipelineByIdApi = ({
  authenticationToken,
  pipelineId,
}: {
  authenticationToken: string;
  pipelineId: TId;
}): Promise<TOrganization> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.pipelines.get(pipelineId)),
    method: httpMethods.get,
    authenticationToken,
  }).catch((res) => {
    if (process.env.REACT_APP_MOCKAPI_RESPONSE) {
      res = {
        data: mockApi.pipelineByIdMockResponse,
      };
    }
    return res;
  });

export default getPipelineByIdApi;
