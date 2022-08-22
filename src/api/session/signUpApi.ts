import { fetchApi } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

export interface Response {
  access_token: string;
}

interface NewAccount {
  email: string;
  password: string;
  fullname: string;
  organizationName: string;
}

interface Params {
  account: NewAccount;
}

const signUpApi = ({ account }: Params): Promise<void> =>
  fetchApi({
    url: apiUrl(endpoints.signup),
    method: httpMethods.post,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      email: account.email,
      password: account.password,
      full_name: account.fullname,
      organization_name: account.organizationName,
      organization_id: null,
      n_pipelines_executed: 0,
      firebase_id: null,
      role: null,
    }),
  });

export default signUpApi;
