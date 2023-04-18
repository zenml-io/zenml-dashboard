import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getRepositories = ({
  component_id,
  workspace,
  sort_by,
  logical_operator,
  page,
  size,
  name,
  filtersParam,
  // id,
  authenticationToken,
}: {
  component_id?: any;
  workspace: string;
  sort_by: string;
  logical_operator: string;
  page: number;
  size: number;
  name?: string;
  filtersParam?: object;
  // id?: any;
  authenticationToken: string;
}): Promise<TStack> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.repositories.getAll(workspace)),
    params: {
      component_id,
      sort_by,
      logical_operator,
      page,
      size,
      name,
      ...filtersParam,
      // id,
    },
    method: httpMethods.get,
    authenticationToken,
  });

export default getRepositories;
