import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import mockApi from '../mockApiData';

const getMembersApi = ({
  authenticationToken,
}: {
  authenticationToken: string;
}): Promise<TMember[]> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.organizations.members),
    method: httpMethods.get,
    authenticationToken,
  }).catch((res) => {
    if (process.env.REACT_APP_MOCKAPI_RESPONSE) {
      res = {
        data: mockApi.myOrganizationMockResponse.organizationMembers,
      };
    }
    return res;
  });

export default getMembersApi;
