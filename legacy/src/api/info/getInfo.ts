import { apiUrl } from '../apiUrl';
import { httpMethods } from '../constants';
import { endpoints } from '../endpoints';
import { fetchApi } from '../fetchApi';
import { ServerInfo } from '../types';

export default function getServerInfo(): Promise<ServerInfo> {
  return fetchApi({
    url: apiUrl(endpoints.serverInfo),
    method: httpMethods.get,
  });
}
