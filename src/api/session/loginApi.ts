import { fetchApi } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import queryString from 'query-string';
// import mockApi from '../mockApiData';

export interface Response {
  access_token: string;
}

interface Account {
  username: string;
  password: string;
}

interface Params {
  account: Account;
}

const loginApi = ({ account }: Params): Promise<Response> =>
  fetchApi({
    url: apiUrl(endpoints.login),
    method: httpMethods.post,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: queryString.stringify({
      username: account.username,
      password: account.password,
    }),
  })
  // .catch((res) => {
  //   if (process.env.REACT_APP_MOCKAPI_RESPONSE) {
  //     res = {
  //       data: mockApi.loginMockResponse,
  //     };
  //   }
  //   return res;
  // });

export default loginApi;