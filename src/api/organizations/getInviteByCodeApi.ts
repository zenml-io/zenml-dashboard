import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import mockApi from '../mockApiData';

const getInviteByCodeApi = ({
  username,
  authenticationToken,
}: {
  username: string;
  authenticationToken: string;
}): Promise<TOrganization> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.organizations.reGenerateToken(username)),
    method: httpMethods.put,
    authenticationToken,
  }).catch((res) => {
    if (process.env.REACT_APP_MOCKAPI_RESPONSE) {
      res = {
        data: mockApi.myOrganizationMockResponse.myOrganizationInviteMockResponse,
      };
    }
    return res;
  });

export default getInviteByCodeApi;
