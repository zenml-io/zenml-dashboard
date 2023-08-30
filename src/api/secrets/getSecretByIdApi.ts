import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import { Secret } from '../types';

const getsecretByIdApi = ({
  authenticationToken,
  secretId,
}: {
  authenticationToken: string;
  secretId: TId;
}): Promise<Secret> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.Secrets.get(secretId)),
    method: httpMethods.get,
    authenticationToken,
  });

export default getsecretByIdApi;
