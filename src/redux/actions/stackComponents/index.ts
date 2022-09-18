import { getStackComponentListAction } from './getStackComponentListAction';
import { getStackComponentByIdAction } from './getStackComponentByIdAction';
import { getAllRunsByStackComponentId } from './getAllRunsByStackComponentId';
import { getStackComponentTypesAction } from './getStackComponentTypesAction';

export const stackComponentsActions = {
  getTypes: getStackComponentTypesAction,
  getMy: getStackComponentListAction,
  stackForId: getStackComponentByIdAction,
  allRunsByStackId: getAllRunsByStackComponentId,
};
