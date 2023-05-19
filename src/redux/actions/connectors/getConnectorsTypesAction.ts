import { connectorActionTypes } from '../../actionTypes';
import getConnectorsTypesApi from '../../../api/connectors/getConnectorsTypesApi';

export const getConnectorsTypesAction = ({
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
  type: connectorActionTypes.ConnectorsTypes.request,
  payload: {
    apiMethod: getConnectorsTypesApi,
    isAuthenticated: true,
    failureActionType: connectorActionTypes.ConnectorsTypes.failure,
    successActionType: connectorActionTypes.ConnectorsTypes.success,
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
