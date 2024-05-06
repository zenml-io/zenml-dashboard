import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getFlavorByIdApi = ({
  authenticationToken,
  flavorId,
}: {
  authenticationToken: string;
  flavorId: TId;
}): Promise<TOrganization> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.flavors.getById(flavorId)),
    method: httpMethods.get,
    authenticationToken,
  });

export default getFlavorByIdApi;
