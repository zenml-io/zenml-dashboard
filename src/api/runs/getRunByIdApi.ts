import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

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
  });

export default getRunByIdApi;
