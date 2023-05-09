import { actionTypes } from './constants';
import { generateApiActionsTypes } from './generateApiActionsTypes';

export const connectorActionTypes = {
  getMyConnectors: generateApiActionsTypes(
    actionTypes.CONNECTORS_GET_MY_CONNECTORS,
  ),
  getConnectorForId: generateApiActionsTypes(
    actionTypes.CONNECTORS_GET_CONNECTOR_FOR_ID,
  ),
};
