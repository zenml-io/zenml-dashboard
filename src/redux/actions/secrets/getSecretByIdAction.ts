import { secretActionTypes } from '../../actionTypes';
import getSecretByIdApi from '../../../api/secrets/getSecretByIdApi';

export const getSecretByIdAction = ({
  secretId,
  onSuccess,
  onFailure,
}: {
  secretId: TId;
  onSuccess?: (res: any) => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: secretActionTypes.getSecretForId.request,
  payload: {
    apiMethod: getSecretByIdApi,
    isAuthenticated: true,
    failureActionType: secretActionTypes.getSecretForId.failure,
    successActionType: secretActionTypes.getSecretForId.success,
    params: { secretId },
    onSuccess,
    onFailure,
  },
});
