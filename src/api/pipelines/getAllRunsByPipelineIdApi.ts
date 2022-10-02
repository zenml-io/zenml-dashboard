import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
// import mockApi from '../mockApiData';

const getAllRunsByPipelineIdApi = ({
  authenticationToken,
  pipelineId,
}: {
  authenticationToken: string;
  pipelineId: TId;
}): Promise<TOrganization> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.runs.pipeline.get(pipelineId)), // todo: get runs by pipeline id please update endpoint
    method: httpMethods.get,
    authenticationToken,
  });
export default getAllRunsByPipelineIdApi;
