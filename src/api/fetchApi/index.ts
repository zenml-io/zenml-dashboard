import axios from 'axios';
import { httpMethods } from '../constants';
export let source: any = { cancel: [] };

export const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const fetchApi = ({
  url,
  data,
  method,
  headers,
  params,
}: {
  url: string;
  data?: any;
  method: any;
  headers?: any;
  params?: any;
}): Promise<any> => {
  return axios({
    method: method || httpMethods.get,
    url,
    data,
    headers: { ...DEFAULT_HEADERS, ...headers },
    params: params,
  });
};

export const fetchApiWithAuthRequest = ({
  url,
  data,
  method,
  params,
  authenticationToken,
  headers,
}: {
  url: string;
  params?: any;
  data?: any;
  method: any;
  authenticationToken: string;
  headers?: any;
}): Promise<any> => {
  const CancelToken = axios.CancelToken;
  return axios({
    method: method || httpMethods.get,
    url,
    params,
    data,
    cancelToken: new CancelToken(function executor(c) {
      // An executor function receives a cancel function as a parameter
      source.cancel.push(c);
    }),
    headers: {
      ...DEFAULT_HEADERS,
      ...headers,
      ...(!process.env.REACT_APP_USE_COOKIE && {
        Authorization: `Bearer ${authenticationToken}`,
      }),
    },
  });
};

export const fetchApiForAWS = ({
  url,
  file,
}: {
  url: string;
  file: File;
}): Promise<any> =>
  axios({
    method: 'PUT',
    url,
    data: file,
    headers: {
      'Content-Type': file.type,
    },
  });
