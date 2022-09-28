import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
// import mockApi from '../mockApiData';

const getMyUserApi = ({
  authenticationToken,
}: {
  authenticationToken: string;
}): Promise<TUser> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.users.me),
    method: httpMethods.get,
    authenticationToken,
  })
  // .catch((res) => {
  //   if (process.env.REACT_APP_MOCKAPI_RESPONSE) {
  //     res = {
  //       data: mockApi.myUserMockResponse,
  //     };
  //   }
  //   return res;
  // });

export default getMyUserApi;
