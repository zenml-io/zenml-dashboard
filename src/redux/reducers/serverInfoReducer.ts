import { ServerInfo } from '../../api/types';
import { serverInfoActionTypes } from '../actionTypes';

export interface State {
  id: ServerInfo['id'];
  version: ServerInfo['version'];
  deploymentType: ServerInfo['deployment_type'];
  databaseType: ServerInfo['database_type'];
  secretsStoreType: ServerInfo['secrets_store_type'];
  debug: ServerInfo['debug'];
  authScheme: ServerInfo['auth_scheme'];
}

export type Action = {
  type: string;
  payload: ServerInfo;
};

export const initialState: State = {
  databaseType: undefined,
  deploymentType: undefined,
  id: '',
  secretsStoreType: undefined,
  version: '',
  debug: false,
  authScheme: 'OAUTH2_PASSWORD_BEARER',
};

const newState = (info: ServerInfo): State => ({
  databaseType: info.database_type,
  deploymentType: info.deployment_type,
  id: info.id,
  secretsStoreType: info.secrets_store_type,
  version: info.version,
  debug: info.debug,
  authScheme: info.auth_scheme,
});

export default function serverInfoReducer(
  state: State = initialState,
  action: Action,
) {
  switch (action.type) {
    case serverInfoActionTypes.getServerInfo.success: {
      return { ...newState(action.payload) };
    }
    default:
      return state;
  }
}
