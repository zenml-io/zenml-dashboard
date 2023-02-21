import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getFlavorAllApi = ({
  authenticationToken,
  sort_by,
  logical_operator,
  index,
  max_size,
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
  index: number;
  max_size: number;
}): Promise<TStack> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.flavors.all),
    params: { sort_by, logical_operator, index, max_size, ...filtersParam },
    method: httpMethods.get,
    authenticationToken,
  });

export default getFlavorAllApi;
