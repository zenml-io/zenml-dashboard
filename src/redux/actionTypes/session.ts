import { actionTypes } from './constants';
import { generateApiActionsTypes } from './generateApiActionsTypes';

export const ACCOUNT_LOGOUT = actionTypes.LOGOUT;

export const loginActionTypes = generateApiActionsTypes(
  actionTypes.ACCOUNT_LOGIN,
);

export const signupActionTypes = generateApiActionsTypes(
  actionTypes.ACCOUNT_SIGNUP,
);

export const forgotActionTypes = generateApiActionsTypes(
  actionTypes.FORGOT_PASSWORD,
);

export const updateEmailTypes = generateApiActionsTypes(
  actionTypes.UPDATE_EMAIL,
);

export const authoriseHubActionTypes = generateApiActionsTypes(
  actionTypes.AUTHORISE_HUB,
);

export const disconnectHubActionTypes = generateApiActionsTypes(
  actionTypes.DISCONNECT_HUB,
);
