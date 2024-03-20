import { serverInfoActionTypes } from '../../actionTypes';
import getServerInfo from '../../../api/info/getInfo';

export const getServerInfoAction = ({
  onSuccess,
  onFailure,
}: {
  onSuccess?: () => void;
  onFailure?: () => void;
}) => ({
  type: serverInfoActionTypes.getServerInfo.request,
  payload: {
    apiMethod: getServerInfo,
    isAuthenticated: false,
    failureActionType: serverInfoActionTypes.getServerInfo.failure,
    successActionType: serverInfoActionTypes.getServerInfo.success,
    onSuccess,
    onFailure,
  },
});
