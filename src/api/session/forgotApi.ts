import { fetchApi } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

export interface Response {
  access_token: string;
}

interface ForgotEmail {
  email: string;
  password: string;
}

interface Params {
  account: ForgotEmail;
}

const forgotApi = ({ account }: Params): Promise<Response> =>
  fetchApi({
    url: apiUrl(endpoints.users.updateUser(account.email)),
    method: httpMethods.put,
    headers: {
      'Content-Type': 'application/json',
    },
    params: { password: account.password },
  });

export default forgotApi;
