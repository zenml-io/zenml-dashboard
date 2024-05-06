import { actionTypes } from './constants';
import { generateApiActionsTypes } from './generateApiActionsTypes';

export const rolesActionTypes = {
  getRoles: generateApiActionsTypes(actionTypes.ROLES_GET_ALL_ROLES),
};
