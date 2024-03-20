import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import { Flavor } from '../types';
const getFlavorTypeApi = ({
  authenticationToken,
  type,
  page,
  size,
  name,
  sort_by,
}: {
  page: number;
  size: number;
  type: string;
  name?: string;
  sort_by?: string;
  authenticationToken: string;
}): Promise<Flavor> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.flavors.type),
    params: { type, page, size, name, sort_by },
    method: httpMethods.get,
    authenticationToken,
  });

export default getFlavorTypeApi;
