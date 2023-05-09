import { getMyConnectorsAction } from './getMyConnectorsAction';
import { getConnectorByIdAction } from './getConnectorByIdAction';
// import { getAllRunsByStackId } from './getAllRunsBySecretId';

export const connectorsActions = {
  getMy: getMyConnectorsAction,
  connectorForId: getConnectorByIdAction,
  // allRunsByStackId: getAllRunsByStackId,
};
