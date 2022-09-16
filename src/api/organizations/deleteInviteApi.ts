import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const deleteInviteApi = ({
  authenticationToken,
  id,
}: {
  authenticationToken: string;
  id: TId;
}): Promise<void> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.organizations.deleteInvite(id)),
    method: httpMethods.delete,
    authenticationToken,
  });

export default deleteInviteApi;