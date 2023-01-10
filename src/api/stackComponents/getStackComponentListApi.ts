import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getMyStackComponentsApi = ({
  authenticationToken,
  page,
  size,
  type,
  project,
}: {
  project: string;
  authenticationToken: string;
  type: string;
  page: number;
  size: number;
}): Promise<TStack> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.StackComponents.my(type, project, page, size)),
    method: httpMethods.get,
    authenticationToken,
  });

export default getMyStackComponentsApi;
