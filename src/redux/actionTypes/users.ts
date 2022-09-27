import { actionTypes } from './constants';
import { generateApiActionsTypes } from './generateApiActionsTypes';

export const userActionTypes = {
  getMyUser: generateApiActionsTypes(actionTypes.USERS_GET_MY_USER),
  getUserForId: generateApiActionsTypes(actionTypes.USERS_GET_USER_FOR_ID),
  updateUser: generateApiActionsTypes(actionTypes.UPDATE_USER),
};
