import { actionTypes } from './constants';
import { generateApiActionsTypes } from './generateApiActionsTypes';

export const userActionTypes = {
  getMyUser: generateApiActionsTypes(actionTypes.USERS_GET_MY_USER),
  getUserForId: generateApiActionsTypes(actionTypes.USERS_GET_USER_FOR_ID),
  updateUserEmail: generateApiActionsTypes(actionTypes.UPDATE_USER_EMAIL),
};
