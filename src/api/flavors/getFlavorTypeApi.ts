import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getFlavorTypeApi = ({
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
}): Promise<TStack> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.flavors.type(type)),
    params: { sort_by, logical_operator, page, size, ...filtersParam },
    method: httpMethods.get,
    authenticationToken,
  });

export default getFlavorTypeApi;
