import getMyPipelinesApi from './getMyPipelinesApi';

import { endpoints } from '../endpoints';
import { apiUrl } from '../apiUrl';
import { httpMethods } from '../constants';

const mockFetchApiWithAuthRequest = jest.fn().mockImplementation(() => Promise);

jest.mock('../fetchApi', () => ({
  fetchApiWithAuthRequest: (params: any): any =>
    mockFetchApiWithAuthRequest(params),
}));

const authenticationToken = 'token';

describe('getMyPipelinesApi', () => {
  it('calls fetch api with correct params', () => {
    getMyPipelinesApi({ authenticationToken });
    expect(mockFetchApiWithAuthRequest).toHaveBeenCalledWith({
      method: httpMethods.get,
      url: apiUrl(endpoints.pipelines.my),
      authenticationToken,
    });
  });
});
