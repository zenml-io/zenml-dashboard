import { apiUrl } from '../apiUrl';
import { httpMethods } from '../constants';
import { endpoints } from '../endpoints';
import { fetchApi } from '../fetchApi';

export default function getServerInfo() {
  return fetchApi({
    url: apiUrl(endpoints.serverInfo),
    method: httpMethods.get,
  });
}
