import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import mockApi from '../mockApiData';

const getGraphRunByIdApi = ({
  authenticationToken,
  runId,
}: {
  authenticationToken: string;
  runId: TId;
}): Promise<TOrganization> => {
  return fetchApiWithAuthRequest({
    url: apiUrl(endpoints.runs.graphById.get(runId)),
    method: httpMethods.get,
    authenticationToken,
  });
};

export default getGraphRunByIdApi;
