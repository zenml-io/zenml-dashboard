import { getMyStacksAction } from './getMyStacksAction';
import { getStackByIdAction } from './getStackByIdAction';
import { getAllRunsByStackId } from './getAllRunsByStackId';

export const stackComponentsActions = {
  getMy: getMyStacksAction,
  stackForId: getStackByIdAction,
  allRunsByStackId: getAllRunsByStackId,
};
