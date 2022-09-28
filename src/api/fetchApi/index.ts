import axios from 'axios';
import { httpMethods } from '../constants';

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
   if (process.env.REACT_APP_MOCKAPI_RESPONSE) {
     return new Promise((resolve, reject) => {
       reject();
     });
   }
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
  authenticationToken,
  headers,
}: {
  url: string;
  data?: any;
  method: any;
  authenticationToken: string;
  headers?: any;
}): Promise<any> => {
if (process.env.REACT_APP_MOCKAPI_RESPONSE) {
     return new Promise((resolve, reject) => {
       reject();
     });
  }
  return axios({
    method: method || httpMethods.get,
    url,
    data,
    headers: {
      ...DEFAULT_HEADERS,
      ...headers,
      Authorization: `Bearer ${authenticationToken}`,
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
