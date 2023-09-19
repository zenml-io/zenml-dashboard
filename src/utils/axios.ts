import axios from 'axios';
import { getServerInfoFromRedux } from './store';

if (!process.env.REACT_APP_EXTERNAL_DASHBOARD) {
  axios.defaults.withCredentials = true;
}

const axiosInterceptor = axios.interceptors.request.use(function (config) {
  if (config.url?.includes(process.env.REACT_APP_BASE_API_URL as string)) {
    config.headers['Source-Context'] = 'dashboard';
  }

  if (config.url?.includes(process.env.REACT_APP_HUB_API_URL as string)) {
    const serverInfo = getServerInfoFromRedux();
    const debugFlag = serverInfo.debug;
    config.headers['Source-Context'] = 'dashboard';
    config.headers['Debug-Context'] = debugFlag || false;
  }

  return config;
});

export default axiosInterceptor;

export const hubAxios = axios.create({
  withCredentials: false,
});
