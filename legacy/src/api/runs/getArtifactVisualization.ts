import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import { Run } from '../types';

const getArtifactVisualization = async ({
  authenticationToken,
  id,
}: {
  authenticationToken: string;
  id: TId;
}): Promise<Run> => {
  return fetchApiWithAuthRequest({
    url: apiUrl(endpoints.runs.artifactVersionVisualization.get(id)),
    method: httpMethods.get,
    authenticationToken,
  });
};

export default getArtifactVisualization;
