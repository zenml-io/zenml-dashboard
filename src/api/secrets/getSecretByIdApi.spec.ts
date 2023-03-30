import getsecretByIdApi from './getSecretByIdApi';

import { endpoints } from '../endpoints';
import { apiUrl } from '../apiUrl';
import { httpMethods } from '../constants';

const mockFetchApiWithAuthRequest = jest.fn().mockImplementation(() => Promise);

jest.mock('../fetchApi', () => ({
  fetchApiWithAuthRequest: (params: any): any =>
    mockFetchApiWithAuthRequest(params),
}));

const authenticationToken = 'token';
const pipelineId = 'runId';

describe('getsecretByIdApi', () => {
  it('calls fetch api with correct params', () => {
    getsecretByIdApi({ authenticationToken, pipelineId });
    expect(mockFetchApiWithAuthRequest).toHaveBeenCalledWith({
      method: httpMethods.get,
      url: apiUrl(endpoints.secrets.get(pipelineId)),
      authenticationToken,
    });
  });
});
