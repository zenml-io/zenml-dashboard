import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import mockApi from '../mockApiData';

const getMyOrganizationApi = ({
  authenticationToken,
}: {
  authenticationToken: string;
}): Promise<TOrganization> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.organizations.my),
    method: httpMethods.get,
    authenticationToken,
  }).catch((res) => {
    if (process.env.REACT_APP_MOCKAPI_RESPONSE) {
      res = {
        data: mockApi.myOrganizationMockResponse,
      };
    }
    return res;
  });

export default getMyOrganizationApi;
