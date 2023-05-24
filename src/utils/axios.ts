import axios from 'axios';
import { getServerInfoFromRedux } from './store';

const axiosInterceptor = axios.interceptors.request.use(function (config) {
  if (
    config.url?.includes(process.env.REACT_APP_BASE_API_URL as string) ||
    config.url?.includes(process.env.REACT_APP_HUB_API_URL as string)
  ) {
    const serverInfo = getServerInfoFromRedux();
    const token = serverInfo.asdf;
    config.headers['Source-Context'] = ' dashboard';
    config.headers['Debug-Context'] = token || false;
  }

  return config;
});

export default axiosInterceptor;
