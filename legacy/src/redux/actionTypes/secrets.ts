import { actionTypes } from './constants';
import { generateApiActionsTypes } from './generateApiActionsTypes';

export const secretActionTypes = {
  getMySecrets: generateApiActionsTypes(actionTypes.SECRETS_GET_MY_SECRETS),
  getSecretForId: generateApiActionsTypes(
    actionTypes.SECRETS_GET_SECRET_FOR_ID,
  ),
};
