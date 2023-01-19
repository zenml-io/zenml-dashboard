import { fetchApi } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

export interface Response {
  access_token: string;
}

interface NewAccount {
  userId: string;
  username: string;
  fullName: any;
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
      full_name: account.fullName,
      password: account.password,
      activation_token: account.token,
    }),
  });

export default signUpApi;
