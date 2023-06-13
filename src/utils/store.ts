import { store } from '../redux/setup/storeSetup';

export function getServerInfoFromRedux(): TServerInfo {
  return (store.getState() || {}).persisted?.serverInfo || {};
}
