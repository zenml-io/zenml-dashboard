import { fetchApi } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

export interface Response {
  access_token: string;
}

interface ForgotEmail {
  email: string;
}

interface Params {
  account: ForgotEmail;
}

const forgotApi = ({ account }: Params): Promise<Response> =>
  fetchApi({
    url: apiUrl(endpoints.forgot),
    method: httpMethods.post,
    headers: {
      'Content-Type': 'application/json',
    },
    params: { email: account.email },
  });

export default forgotApi;
