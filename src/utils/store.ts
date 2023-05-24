import configureStore from '../redux/setup/storeSetup';

const { store } = configureStore();

export function getServerInfoFromRedux() {
  return (store.getState() || {}).persisted?.serverInfo || {};
}
