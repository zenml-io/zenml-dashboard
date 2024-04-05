import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

export interface Response {
  access_token: string;
}

interface ForgotEmail {
  email: string;
  password: string;
  old_password: string;
}

interface Params {
  account: ForgotEmail;
}

const forgotApi = ({
  userId,
  password,
  old_password,
  authenticationToken,
}: {
  userId: string;
  password: Params;
  old_password: Params;
  authenticationToken: string;
}): Promise<Response> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.users.me),
    method: httpMethods.put,
    authenticationToken,
    headers: {
      'Content-Type': 'application/json',
    },
    data: { password, old_password },
  });

export default forgotApi;
