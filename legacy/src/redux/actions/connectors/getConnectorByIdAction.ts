import { connectorActionTypes } from '../../actionTypes';
import getConnectorByIdApi from '../../../api/connectors/getConnectorByIdApi';

export const getConnectorByIdAction = ({
  connectorId,
  onSuccess,
  onFailure,
}: {
  connectorId: TId;
  onSuccess?: (res: any) => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: connectorActionTypes.getConnectorForId.request,
  payload: {
    apiMethod: getConnectorByIdApi,
    isAuthenticated: true,
    failureActionType: connectorActionTypes.getConnectorForId.failure,
    successActionType: connectorActionTypes.getConnectorForId.success,
    params: { connectorId },
    onSuccess,
    onFailure,
  },
});
