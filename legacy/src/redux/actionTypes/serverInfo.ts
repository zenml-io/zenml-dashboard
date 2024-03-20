import { actionTypes } from './constants';
import { generateApiActionsTypes } from './generateApiActionsTypes';

export const serverInfoActionTypes = {
  getServerInfo: generateApiActionsTypes(actionTypes.SERVER_INFO),
};
