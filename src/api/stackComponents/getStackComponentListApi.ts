import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getMyStackComponentsApi = ({
  authenticationToken,
  sort_by,
  logical_operator,
  page,
  size,
  type,
  filtersParam,
  id,
  workspace,
}: {
  workspace: string;
  authenticationToken: string;
  sort_by: string;
  logical_operator: string;
  type: string;
  filtersParam?: object;
  id?: any;
  page: number;
  size: number;
}): Promise<TStack> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.StackComponents.my(type, workspace)),
    params: {
      sort_by,
      logical_operator,
      page,
      size,
      ...filtersParam,
      // ,id
    },
    method: httpMethods.get,
    authenticationToken,
  });

export default getMyStackComponentsApi;
