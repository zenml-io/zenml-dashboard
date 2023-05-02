import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getAllRunsByRepositoryIdApi = ({
  authenticationToken,
  repositoryID,
  sort_by,
  logical_operator,
  page,
  size,
  filtersParam,
}: {
  sort_by: string;
  logical_operator: string;
  page: number;
  size: number;
  filtersParam?: any;
  authenticationToken: string;
  repositoryID: TId;
}): Promise<TOrganization> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.runs.repository.get(repositoryID)),
    params: { sort_by, logical_operator, page, size, ...filtersParam }, // todo: get runs by pipeline id please update endpoint
    method: httpMethods.get,
    authenticationToken,
  });

export default getAllRunsByRepositoryIdApi;
