import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getStackByIdApi = ({
  authenticationToken,
  stackId,
}: {
  authenticationToken: string;
  stackId: TId;
}): Promise<TOrganization> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.Stacks.get(stackId)),
    method: httpMethods.get,
    authenticationToken,
  });

export default getStackByIdApi;
