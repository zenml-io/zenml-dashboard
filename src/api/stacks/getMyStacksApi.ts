import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getMyStacksApi = ({
  workspace,
  sort_by,
  logical_operator,
  page,
  size,
  filtersParam,
  authenticationToken,
}: {
  workspace: string;
  sort_by: string;
  logical_operator: string;
  page: number;
  size: number;
  filtersParam?: object;
  authenticationToken: string;
}): Promise<TStack> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.Stacks.my(workspace)),
    params: { sort_by, logical_operator, page, size, ...filtersParam },
    method: httpMethods.get,
    authenticationToken,
  });

export default getMyStacksApi;
