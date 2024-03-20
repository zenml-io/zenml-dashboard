import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import { ServiceConnector } from '../types';

const getMyConnectorsApi = ({
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
}): Promise<ServiceConnector> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.Connectors.my(workspace)),
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

export default getMyConnectorsApi;
