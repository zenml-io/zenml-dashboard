import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getMyStackComponentsApi = ({
  authenticationToken,
  type,
  project,
}: {
  project: string;
  authenticationToken: string;
  type: string;
}): Promise<TStack> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.StackComponents.my(type, project)),
    method: httpMethods.get,
    authenticationToken,
  });

export default getMyStackComponentsApi;
