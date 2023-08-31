import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import { Repository } from '../types';

const getRepositoryByID = ({
  authenticationToken,
  repositoryID,
}: {
  authenticationToken: string;
  repositoryID: TId;
}): Promise<Repository> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.repositories.getByID(repositoryID)),
    method: httpMethods.get,
    authenticationToken,
  });

export default getRepositoryByID;
