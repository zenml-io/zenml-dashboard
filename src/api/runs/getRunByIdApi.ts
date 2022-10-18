import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import mockApi from '../mockApiData';

const getRunByIdApi = ({
  authenticationToken,
  pipelineId,
  runId,
}: {
  authenticationToken: string;
  pipelineId: TId;
  runId: TId;
}): Promise<TOrganization> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.runs.get(runId)),
    method: httpMethods.get,
    authenticationToken,
  }).catch((res) => {
    if (process.env.REACT_APP_MOCKAPI_RESPONSE) {
      res = {
        data: mockApi.runByIdMockResponse,
      };
    }
    return res;
  });

export default getRunByIdApi;
