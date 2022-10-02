import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
// import mockApi from '../mockApiData';

const getStackComponentByIdApi = ({
  authenticationToken,
  stackComponentId,
}: {
  authenticationToken: string;
  stackComponentId: TId;
}): Promise<TOrganization> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.StackComponents.get(stackComponentId)),
    method: httpMethods.get,
    authenticationToken,
  });

export default getStackComponentByIdApi;
