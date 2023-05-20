import { getMyConnectorsAction } from './getMyConnectorsAction';
import { getConnectorByIdAction } from './getConnectorByIdAction';
import { getConnectorsTypesAction } from './getConnectorsTypesAction';

export const connectorsActions = {
  getMy: getMyConnectorsAction,
  connectorForId: getConnectorByIdAction,
  getConnectorsTypes: getConnectorsTypesAction,
};
