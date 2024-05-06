import { getMyConnectorsAction } from './getMyConnectorsAction';
import { getConnectorByIdAction } from './getConnectorByIdAction';
import { getConnectorsTypesAction } from './getConnectorsTypesAction';
import { getConnectorComponentAction } from './getConnectorComponentAction';
export const connectorsActions = {
  getMy: getMyConnectorsAction,
  connectorForId: getConnectorByIdAction,
  getConnectorsTypes: getConnectorsTypesAction,
  getConnectorComponent: getConnectorComponentAction,
};
