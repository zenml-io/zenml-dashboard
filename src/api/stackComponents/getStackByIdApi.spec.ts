import getStackComponentByIdApi from './getStackComponentByIdApi';

import { endpoints } from '../endpoints';
import { apiUrl } from '../apiUrl';
import { httpMethods } from '../constants';

const mockFetchApiWithAuthRequest = jest.fn().mockImplementation(() => Promise);

jest.mock('../fetchApi', () => ({
  fetchApiWithAuthRequest: (params: any): any =>
    mockFetchApiWithAuthRequest(params),
}));

const authenticationToken = 'token';
const stackId = 'runId';

describe('getStackByIdApi', () => {
  it('calls fetch api with correct params', () => {
    getStackComponentByIdApi({ authenticationToken, stackId });
    expect(mockFetchApiWithAuthRequest).toHaveBeenCalledWith({
      method: httpMethods.get,
      url: apiUrl(endpoints.Stacks.get(stackId)),
      authenticationToken,
    });
  });
});
