import { fetchApi } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import mockApi from '../mockApiData';

export interface Response {
  access_token: string;
}

interface NewAccount {
  userId: string;
  username: string;
  fullname: any;
  email: string;
  password: string;
  token: string;
}

interface Params {
  account: NewAccount;
}

const signUpApi = ({ account }: Params): Promise<void> =>
  fetchApi({
    url: apiUrl(endpoints.signup(account.userId)),
    method: httpMethods.put,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      name: account.username,
      full_name: account.fullname,
      email: account.email,
      password: account.password,
      activation_token: account.token
    }),
  }).catch((res) => {
    if (process.env.REACT_APP_MOCKAPI_RESPONSE) {
      res = {
        data: mockApi.signupMockResponse,
      };
    }
    return res;
  });

export default signUpApi;