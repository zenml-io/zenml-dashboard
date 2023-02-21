import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getAllRunsByPipelineIdApi = ({
  authenticationToken,
  pipelineId,
  sort_by,
  logical_operator,
  index,
  max_size,
  filtersParam,
}: {
  authenticationToken: string;
  sort_by: string;
  logical_operator: string;
  pipelineId: TId;
  index: number;
  max_size: number;
  filtersParam?: any;
}): Promise<TOrganization> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.runs.pipeline.get(pipelineId)),
    params: { sort_by, logical_operator, index, max_size, ...filtersParam }, // todo: get runs by pipeline id please update endpoint
    method: httpMethods.get,
    authenticationToken,
  });
export default getAllRunsByPipelineIdApi;
