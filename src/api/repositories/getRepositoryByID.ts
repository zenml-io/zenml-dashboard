import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getRepositoryByID = ({
  authenticationToken,
  repositoryID,
}: {
  authenticationToken: string;
  repositoryID: TId;
}): Promise<any> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.repositories.getByID(repositoryID)),
    method: httpMethods.get,
    authenticationToken,
  });

export default getRepositoryByID;
