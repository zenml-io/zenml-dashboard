import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getConnectorComponentsApi = ({
  connector_id,
  workspace,
  sort_by,
  logical_operator,
  page,
  size,
  name,
  filtersParam,

  authenticationToken,
}: {
  connector_id?: string;
  workspace: string;
  sort_by: string;
  logical_operator: string;
  page: number;
  size: number;
  name?: string;
  filtersParam?: object;

  authenticationToken: string;
}): Promise<any> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.Connectors.connectorComponents),
    params: {
      connector_id,
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

export default getConnectorComponentsApi;
