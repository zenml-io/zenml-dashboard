import getMyconnectorsApi from './getMyConnectorsApi';

import { endpoints } from '../endpoints';
import { apiUrl } from '../apiUrl';
import { httpMethods } from '../constants';

const mockFetchApiWithAuthRequest = jest.fn().mockImplementation(() => Promise);

jest.mock('../fetchApi', () => ({
  fetchApiWithAuthRequest: (params: any): any =>
    mockFetchApiWithAuthRequest(params),
}));

const authenticationToken = 'token';

describe('getMyconnectorsApi', () => {
  it('calls fetch api with correct params', () => {
    expect(mockFetchApiWithAuthRequest).toHaveBeenCalledWith({
      method: httpMethods.get,
      url: apiUrl(endpoints.Connectors.my),
      authenticationToken,
    });
  });
});
