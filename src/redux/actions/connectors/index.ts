import { getMyConnectorsAction } from './getMyConnectorsAction';
import { getConnectorByIdAction } from './getConnectorByIdAction';
import { getConnectorsListAction } from './getConnectorsListAction';

export const connectorsActions = {
  getMy: getMyConnectorsAction,
  connectorForId: getConnectorByIdAction,
  getConnectorsList: getConnectorsListAction,
};
