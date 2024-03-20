import getUserByIdApi from './getUserByIdApi';

import { endpoints } from '../endpoints';
import { apiUrl } from '../apiUrl';
import { httpMethods } from '../constants';

const mockFetchApiWithAuthRequest = jest.fn().mockImplementation(() => Promise);

jest.mock('../fetchApi', () => ({
  fetchApiWithAuthRequest: (params: any): any =>
    mockFetchApiWithAuthRequest(params),
}));

const authenticationToken = 'token';
const userId = 'userId';

describe('getRunByIdApi', () => {
  it('calls fetch api with correct params', () => {
    getUserByIdApi({ authenticationToken, userId });
    expect(mockFetchApiWithAuthRequest).toHaveBeenCalledWith({
      method: httpMethods.get,
      url: apiUrl(endpoints.users.get(userId)),
      authenticationToken,
    });
  });
});
