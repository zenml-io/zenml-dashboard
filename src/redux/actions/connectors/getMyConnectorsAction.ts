import { connectorActionTypes } from '../../actionTypes';
import getMyConnectorsApi from '../../../api/connectors/getMyConnectorsApi';

export const getMyConnectorsAction = ({
  component_id,
  workspace,
  sort_by,
  logical_operator,
  page,
  name,
  size,
  filtersParam,
  // id,
  onSuccess,
  onFailure,
}: {
  component_id?: any;
  name?: string;
  workspace?: string;
  sort_by?: string;
  logical_operator?: string;
  page?: number;
  size?: number;
  filtersParam?: object;
  // id?: any;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: connectorActionTypes.getMyConnectors.request,
  payload: {
    apiMethod: getMyConnectorsApi,
    isAuthenticated: true,
    failureActionType: connectorActionTypes.getMyConnectors.failure,
    successActionType: connectorActionTypes.getMyConnectors.success,
    params: {
      component_id,
      workspace,
      name,
      sort_by,
      logical_operator,
      page,
      size,
      filtersParam,
      // id,
    },
    onSuccess,
    onFailure,
  },
});
