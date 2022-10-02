import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import mockApi from '../mockApiData';

const getUserByIdApi = ({
  authenticationToken,
  userId,
}: {
  authenticationToken: string;
  userId: TId;
}): Promise<TOrganization> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.users.get(userId)),
    method: httpMethods.get,
    authenticationToken,
  }).catch((res) => {
    if (process.env.REACT_APP_MOCKAPI_RESPONSE) {
      res = {
        data: mockApi.userByIdMockResponse,
      };
    }
    return res;
  });

export default getUserByIdApi;
