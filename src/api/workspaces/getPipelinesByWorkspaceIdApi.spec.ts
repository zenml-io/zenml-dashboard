import getPipelinesByWorkspaceIdApi from './getPipelinesByWorkspaceIdApi';

import { endpoints } from '../endpoints';
import { apiUrl } from '../apiUrl';
import { httpMethods } from '../constants';

const mockFetchApiWithAuthRequest = jest.fn().mockImplementation(() => Promise);

jest.mock('../fetchApi', () => ({
  fetchApiWithAuthRequest: (params: any): any =>
    mockFetchApiWithAuthRequest(params),
}));

const authenticationToken = 'token';
const id = 'id';

describe('getPipelinesByWorkspaceId', () => {
  it('calls fetch api with correct params', () => {
    getPipelinesByWorkspaceIdApi({ authenticationToken, id });
    expect(mockFetchApiWithAuthRequest).toHaveBeenCalledWith({
      method: httpMethods.get,
      url: apiUrl(endpoints.workspaces.pipelinesForId(id)),
      authenticationToken,
    });
  });
});
