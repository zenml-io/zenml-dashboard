import _ from 'lodash';

import { State } from '../reducers/workspacesReducer';

const stateKey = (state: State): State =>
  _.get(state, 'persisted.workspaces') || {};

const getById = (state: State): Record<TId, Workspaces> =>
  _.get(stateKey(state), 'byId');

const getMyWorkspaceIds = (state: State): TId[] =>
  _.get(stateKey(state), 'myWorkspaceIds');

const getSelectedWorkspaceIds = (state: State): string =>
  _.get(stateKey(state), 'selectedWorkspace');

const getWorkspaceStats = (state: State): any =>
  _.get(stateKey(state), 'workspaceStats');


export const myWorkspaces = (state?: State | null): Workspaces[] => {
  if (!state) return [];
  const myWorkspaceIds = getMyWorkspaceIds(state);
  const byId = getById(state);

  return (myWorkspaceIds || []).reduce((current: Workspaces[], id: TId) => {
    const workspace = byId[id];

    if (workspace) {
      current = [...current, workspace];
    }

    return current;
  }, [] as Workspaces[]);
};
export const selectedWorkspace = (state?: State | null): string => {
  if (!state) return '';
  const workspace = getSelectedWorkspaceIds(state);
  return workspace;
};

export const workspaceStats = (state?: State | null): string => {
  if (!state) return '';
  const workspaceStats = getWorkspaceStats(state);
  return workspaceStats;
};


const workspaceSelectors = {
  myWorkspaces: myWorkspaces,
  selectedWorkspace: selectedWorkspace,
  myWorkspaceStats: workspaceStats
};

export { workspaceSelectors };