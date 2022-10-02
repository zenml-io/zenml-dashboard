import getBillingByRunIdApi from './getBillingByRunIdApi';

import { endpoints } from '../endpoints';
import { apiUrl } from '../apiUrl';
import { httpMethods } from '../constants';

const mockFetchApiWithAuthRequest = jest.fn().mockImplementation(() => Promise);

jest.mock('../fetchApi', () => ({
  fetchApiWithAuthRequest: (params: any): any =>
    mockFetchApiWithAuthRequest(params),
}));

const authenticationToken = 'token';
const runId = 'runId';
const pipelineId = 'runId';

describe('getBillingByRunIdApi', () => {
  it('calls fetch api with correct params', () => {
    getBillingByRunIdApi({ authenticationToken, runId, pipelineId });
    expect(mockFetchApiWithAuthRequest).toHaveBeenCalledWith({
      method: httpMethods.get,
      url: apiUrl(endpoints.billing.get(pipelineId, runId)),
      authenticationToken,
    });
  });
});
