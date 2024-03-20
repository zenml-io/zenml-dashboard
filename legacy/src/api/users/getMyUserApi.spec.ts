import getMyUserApi from './getMyUserApi';

import { endpoints } from '../endpoints';
import { apiUrl } from '../apiUrl';
import { httpMethods } from '../constants';

const mockFetchApiWithAuthRequest = jest.fn().mockImplementation(() => Promise);

jest.mock('../fetchApi', () => ({
  fetchApiWithAuthRequest: (params: any): any =>
    mockFetchApiWithAuthRequest(params),
}));

const authenticationToken = 'token';

describe('getMyUserApi', () => {
  it('calls fetch api with correct params', () => {
    getMyUserApi({ authenticationToken });
    expect(mockFetchApiWithAuthRequest).toHaveBeenCalledWith({
      method: httpMethods.get,
      url: apiUrl(endpoints.users.me),
      authenticationToken,
    });
  });
});
