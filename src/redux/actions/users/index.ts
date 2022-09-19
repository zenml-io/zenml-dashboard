import { getMyUserAction } from './getMyUserAction';
import { getUserByIdAction } from './getUserByIdAction';
import { updateUserEmailAction } from './updateUserEmailAction';

export const userActions = {
  getMy: getMyUserAction,
  userForId: getUserByIdAction,
  updateUserEmail: updateUserEmailAction
};
