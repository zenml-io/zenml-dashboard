import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import mockApi from '../mockApiData';

const getMyStackComponentsApi = ({
  authenticationToken,
}: {
  authenticationToken: string;
}): Promise<TStack> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.Stacks.my),
    method: httpMethods.get,
    authenticationToken,
  });

export default getMyStackComponentsApi;
