import { connectorActionTypes } from '../../actionTypes';
import getConnectorComponentsApi from '../../../api/connectors/getConnectorComponentsApi';

export const getConnectorComponentAction = ({
  connector_id,
  workspace,
  page,
  size,
  type,
  name,
  sort_by,
  logical_operator,
  filtersParam,
  onSuccess,
  onFailure,
}: {
  connector_id?: any;
  workspace?: any;
  page?: number;
  size?: number;
  type?: string;
  name?: string;
  logical_operator?: any;
  filtersParam?: any;
  sort_by?: string;
  onSuccess?: (res: any) => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: connectorActionTypes.getConnectorComponents.request,
  payload: {
    apiMethod: getConnectorComponentsApi,
    isAuthenticated: true,
    failureActionType: connectorActionTypes.getConnectorComponents.failure,
    successActionType: connectorActionTypes.getConnectorComponents.success,
    params: {
      type,
      page,
      size,
      name,
      sort_by,
      filtersParam,
      connector_id,
      logical_operator,
    },
    onSuccess,
    onFailure,
  },
});
