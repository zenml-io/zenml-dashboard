import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import mockApi from '../mockApiData';

const getMyStackComponentsApi = ({
  authenticationToken,
  type,
}: {
  authenticationToken: string;
  type: string;
}): Promise<TStack> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.StackComponents.my(type)),
    method: httpMethods.get,
    authenticationToken,
  });

export default getMyStackComponentsApi;
