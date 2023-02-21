import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getMyPipelinesApi = ({
  authenticationToken,
  workspace,
  sort_by,
  logical_operator,
  index,
  max_size,
  filtersParam,
}: {
  sort_by: string;
  logical_operator: string;
  index: number;
  max_size: number;
  name?: string;
  authenticationToken: string;
  workspace: string;
  filtersParam?: object;
}): Promise<TPipeline> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.pipelines.my(workspace)),
    params: { sort_by, logical_operator, index, max_size, ...filtersParam },
    method: httpMethods.get,
    authenticationToken,
  });

export default getMyPipelinesApi;
