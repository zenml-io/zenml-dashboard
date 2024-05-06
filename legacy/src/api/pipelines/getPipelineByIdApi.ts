import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

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
  });

export default getPipelineByIdApi;
