import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getFlavorTypeApi = ({
  authenticationToken,
  type,
  index,
  max_size,
  name,
}: {
  index: number;
  max_size: number;
  type: string;
  name?: string;
  authenticationToken: string;
}): Promise<TStack> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.flavors.type),
    params: { type, index, max_size, name },
    method: httpMethods.get,
    authenticationToken,
  });

export default getFlavorTypeApi;
