import { connectorActionTypes } from '../../actionTypes';
import getConnectorsListApi from '../../../api/connectors/getConnectorsListApi';

export const getConnectorsListAction = ({
  page,
  size,
  type,
  name,
  sort_by,
  onSuccess,
  onFailure,
}: {
  page?: number;
  size?: number;
  type?: string;
  name?: string;
  sort_by?: string;
  onSuccess?: (res: any) => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: connectorActionTypes.ConnectorsList.request,
  payload: {
    apiMethod: getConnectorsListApi,
    isAuthenticated: true,
    failureActionType: connectorActionTypes.ConnectorsList.failure,
    successActionType: connectorActionTypes.ConnectorsList.success,
    params: {
      type,
      page,
      size,
      name,
      sort_by,
    },
    onSuccess,
    onFailure,
  },
});
