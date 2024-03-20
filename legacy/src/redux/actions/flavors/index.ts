import { getFlavorAllAction } from './getFlavorAllAction';
import { getFlavorByIdAction } from './getFlavorByIdAction';
import { getFlavorTypeAction } from './getFlavorTypeAction';

export const flavorsActions = {
  getAll: getFlavorAllAction,
  getType: getFlavorTypeAction,
  getById: getFlavorByIdAction,
};
