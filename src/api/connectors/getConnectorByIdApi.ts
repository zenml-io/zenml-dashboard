import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getconnectorByIdApi = ({
  authenticationToken,
  connectorId,
}: {
  authenticationToken: string;
  connectorId: TId;
}): Promise<TOrganization> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.Connectors.get(connectorId)),
    method: httpMethods.get,
    authenticationToken,
  });

export default getconnectorByIdApi;
