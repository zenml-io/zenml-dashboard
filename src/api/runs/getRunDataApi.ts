import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import { Run } from '../types';

const getArtifactDataApi = async ({
  authenticationToken,
  exe_id,
}: {
  authenticationToken: string;
  exe_id: TId;
}): Promise<Run> => {
  return fetchApiWithAuthRequest({
    url: apiUrl(endpoints.runs.artifact.get(exe_id)),
    method: httpMethods.get,
    authenticationToken,
  });
};

export default getArtifactDataApi;
