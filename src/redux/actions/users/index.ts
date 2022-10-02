import { getMyUserAction } from './getMyUserAction';
import { getUserByIdAction } from './getUserByIdAction';

export const userActions = {
  getMy: getMyUserAction,
  userForId: getUserByIdAction,
};
