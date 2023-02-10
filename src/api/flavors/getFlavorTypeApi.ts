import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getFlavorTypeApi = ({
  authenticationToken,
  type,
  page,
  size,
}: {
  page: number;
  size: number;
  type: string;
  authenticationToken: string;
}): Promise<TStack> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.flavors.type(type)),
    params: { type, page, size },
    method: httpMethods.get,
    authenticationToken,
  });

export default getFlavorTypeApi;
