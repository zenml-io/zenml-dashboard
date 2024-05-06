import { repositoryActionTypes } from '../../actionTypes';
import getRunsByRepositoryID from '../../../api/repositories/getRunsByRepoId';

export const getAllRunsByRepositoryId = ({
  repositoryID,
  sort_by,
  logical_operator,
  page,
  size,
  filtersParam,
  onSuccess,
  onFailure,
}: {
  sort_by: string;
  logical_operator: string;
  page: number;
  size: number;
  filtersParam?: any;
  repositoryID: TId;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => {
  return {
    type: repositoryActionTypes.getRunsByRepoID.request,
    payload: {
      apiMethod: getRunsByRepositoryID,
      isAuthenticated: true,
      failureActionType: repositoryActionTypes.getRunsByRepoID.failure,
      successActionType: repositoryActionTypes.getRunsByRepoID.success,
      params: {
        sort_by,
        logical_operator,
        repositoryID,
        page,
        size,
        filtersParam,
      },
      onSuccess,
      onFailure,
    },
  };
};
