import { store } from '../redux/setup/storeSetup';

export function getServerInfoFromRedux() {
  return (store.getState() || {}).persisted?.serverInfo || {};
}
