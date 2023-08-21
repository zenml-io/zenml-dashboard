import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getConnectorsTypesApi = ({
  component_id,
  workspace,
  sort_by,
  logical_operator,
  page,
  size,
  connector_type,
  filtersParam,

  authenticationToken,
}: {
  component_id?: any;
  workspace: string;
  sort_by: string;
  logical_operator: string;
  page: number;
  size: number;
  connector_type?: string;
  filtersParam?: object;

  authenticationToken: string;
}): Promise<any> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.Connectors.connectorsTypes),
    params: {
      component_id,
      sort_by,
      logical_operator,
      page,
      size,
      connector_type,
      ...filtersParam,
    },
    method: httpMethods.get,
    authenticationToken,
  });

export default getConnectorsTypesApi;
