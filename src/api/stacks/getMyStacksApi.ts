import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getMyStacksApi = ({
  project,
  page,
  size,
  authenticationToken,
}: {
  project: string;
  page: number;
  size: number;
  authenticationToken: string;
}): Promise<TStack> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.Stacks.my(project, page, size)),
    method: httpMethods.get,
    authenticationToken,
  });

export default getMyStacksApi;
