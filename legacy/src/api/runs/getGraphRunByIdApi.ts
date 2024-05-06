import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import { Run } from '../types';

const getGraphRunByIdApi = ({
  authenticationToken,
  runId,
}: {
  authenticationToken: string;
  runId: TId;
}): Promise<Run> => {
  return fetchApiWithAuthRequest({
    url: apiUrl(endpoints.runs.graphById.get(runId)),
    method: httpMethods.get,
    authenticationToken,
  });
};

export default getGraphRunByIdApi;
