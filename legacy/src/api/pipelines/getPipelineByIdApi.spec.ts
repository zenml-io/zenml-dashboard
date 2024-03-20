import getPipelineByIdApi from './getPipelineByIdApi';

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

describe('getPipelineByIdApi', () => {
  it('calls fetch api with correct params', () => {
    getPipelineByIdApi({ authenticationToken, pipelineId });
    expect(mockFetchApiWithAuthRequest).toHaveBeenCalledWith({
      method: httpMethods.get,
      url: apiUrl(endpoints.pipelines.get(pipelineId)),
      authenticationToken,
    });
  });
});
