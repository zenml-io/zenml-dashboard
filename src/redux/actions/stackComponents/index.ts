import { getMyStackComponentsAction } from './getMyStackComponentsAction';
import { getStackComponentByIdAction } from './getStackComponentByIdAction';
import { getAllRunsByStackComponentId } from './getAllRunsByStackComponentId';
import { getStackComponentTypesAction } from './getStackComponentTypesAction';

export const stackComponentsActions = {
  getTypes: getStackComponentTypesAction,
  getMy: getMyStackComponentsAction,
  stackForId: getStackComponentByIdAction,
  allRunsByStackId: getAllRunsByStackComponentId,
};
