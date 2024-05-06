import loginApi from './loginApi';
import queryString from 'query-string';

import { endpoints } from '../endpoints';
import { apiUrl } from '../apiUrl';
import { httpMethods } from '../constants';

const mockFetchApiRequest = jest.fn().mockImplementation(() => Promise);

jest.mock('../fetchApi', () => ({
  fetchApi: (params: any): any => mockFetchApiRequest(params),
}));

const account = { email: 'test@test.de', password: 'testtest' };

describe('loginApi', () => {
  it('calls fetch api with correct params', () => {
    loginApi({ account });

    expect(mockFetchApiRequest).toHaveBeenCalledWith({
      method: httpMethods.post,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: queryString.stringify({
        username: account.email,
        password: account.password,
      }),
      url: apiUrl(endpoints.login),
    });
  });
});
