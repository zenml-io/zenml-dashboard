import axios from 'axios';
import { getServerInfoFromRedux } from './store';

const axiosInterceptor = axios.interceptors.request.use(function (config) {
  if (config.url?.includes(process.env.REACT_APP_BASE_API_URL as string)) {
    config.headers['Source-Context'] = 'dashboard';
  }

  if (config.url?.includes(process.env.REACT_APP_HUB_API_URL as string)) {
    const serverInfo = getServerInfoFromRedux();
    const debugFlag = serverInfo.debug;
    config.headers['Source-Context'] = 'dashboard';
    config.headers['Debug-Context'] = debugFlag || false;

    // Log debugFlag value to help debug the issue
    console.debug('Debug-Context flag value:', debugFlag);
    console.debug('serverInfo value:', serverInfo);
  }

  return config;
});

export default axiosInterceptor;
