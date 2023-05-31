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
  // id,
  authenticationToken,
}: {
  connector_id?: any;
  workspace: string;
  sort_by: string;
  logical_operator: string;
  page: number;
  size: number;
  name?: string;
  filtersParam?: object;
  // id?: any;
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
      // id,
    },
    method: httpMethods.get,
    authenticationToken,
  });

export default getConnectorComponentsApi;
