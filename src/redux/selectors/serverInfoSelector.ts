import { State } from '../reducers/serverInfoReducer';
import get from 'lodash/get';

function getServerInfoState(state: any): State {
  return get(state, 'persisted.serverInfo');
}

export function getDeploymentType(state?: any) {
  if (!state) return;
  const serverInfoState = getServerInfoState(state) || {};
  return serverInfoState.deploymentType || '';
}

export const serverInfoSelectors = {
  getDeploymentType,
};
