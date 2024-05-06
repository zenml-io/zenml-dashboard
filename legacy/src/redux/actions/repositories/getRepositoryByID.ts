import { repositoryActionTypes } from '../../actionTypes';
import getRepositoryByID from '../../../api/repositories/getRepositoryByID';

export const getRepositoryByIDAction = ({
  repositoryID,
  onSuccess,
  onFailure,
}: {
  repositoryID: TId;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: repositoryActionTypes.getRepositoryByID.request,
  payload: {
    apiMethod: getRepositoryByID,
    isAuthenticated: true,
    failureActionType: repositoryActionTypes.getRepositoryByID.failure,
    successActionType: repositoryActionTypes.getRepositoryByID.success,
    params: { repositoryID },
    onSuccess,
    onFailure,
  },
});
