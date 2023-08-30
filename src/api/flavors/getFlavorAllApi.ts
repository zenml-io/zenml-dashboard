import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import { Flavor } from '../types';
const getFlavorAllApi = ({
  authenticationToken,
  sort_by,
  logical_operator,
  page,
  size,
  type,
  filtersParam,
  workspace,
}: {
  workspace: string;
  authenticationToken: string;
  sort_by: string;
  logical_operator: string;
  type: string;
  filtersParam?: object;
  page: number;
  size: number;
}): Promise<Flavor> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.flavors.all),
    params: { sort_by, logical_operator, page, size, ...filtersParam },
    method: httpMethods.get,
    authenticationToken,
  });

export default getFlavorAllApi;
