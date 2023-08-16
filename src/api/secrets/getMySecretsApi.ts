import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getMySecretsApi = ({
  component_id,
  workspace,
  sort_by,
  logical_operator,
  page,
  size,
  name,
  filtersParam,

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

  authenticationToken: string;
}): Promise<TStack> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.Secrets.my),
    params: {
      component_id,
      sort_by,
      logical_operator,
      page,
      size,
      name,
      ...filtersParam,
    },
    method: httpMethods.get,
    authenticationToken,
  });

export default getMySecretsApi;
