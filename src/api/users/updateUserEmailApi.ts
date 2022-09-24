import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import mockApi from '../mockApiData';

const updateUserEmailApi = ({
  authenticationToken,
  userId,
  username,
  email,
}: {
  authenticationToken: string;
  userId:string;
  username: string;
  email: string;
}): Promise<TUser> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.users.updateUser(userId)),
    method: httpMethods.put,
    authenticationToken,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
     username, email
    }),
  }).catch((res) => {
    if (process.env.REACT_APP_MOCKAPI_RESPONSE) {
      res = {
        data: mockApi.userByIdMockResponse,
      };
    }
    return res;
  });

export default updateUserEmailApi;