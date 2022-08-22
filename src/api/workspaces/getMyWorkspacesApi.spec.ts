import getMyWorkspacesApi from './getMyWorkspacesApi';

import { endpoints } from '../endpoints';
import { apiUrl } from '../apiUrl';
import { httpMethods } from '../constants';

const mockFetchApiWithAuthRequest = jest.fn().mockImplementation(() => Promise);

jest.mock('../fetchApi', () => ({
  fetchApiWithAuthRequest: (params: any): any =>
    mockFetchApiWithAuthRequest(params),
}));

const authenticationToken = 'token';

describe('getMyWorkspacesApi', () => {
  it('calls fetch api with correct params', () => {
    getMyWorkspacesApi({ authenticationToken });
    expect(mockFetchApiWithAuthRequest).toHaveBeenCalledWith({
      method: httpMethods.get,
      url: apiUrl(endpoints.workspaces.my),
      authenticationToken,
    });
  });
});
