import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getArtifactVisualization = async ({
  authenticationToken,
  id,
}: {
  authenticationToken: string;
  id: TId;
}): Promise<TOrganization> => {
  return fetchApiWithAuthRequest({
    url: apiUrl(endpoints.runs.artifactVisualization.get(id)),
    method: httpMethods.get,
    authenticationToken,
  });
};

export default getArtifactVisualization;
