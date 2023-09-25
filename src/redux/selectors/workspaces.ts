import _ from 'lodash';

import { State } from '../reducers/workspacesReducer';
import { Workspace } from '../../api/types';

const stateKey = (state: State): State =>
  _.get(state, 'persisted.workspaces') || {};

const getById = (state: State): Record<TId, Workspace> =>
  _.get(stateKey(state), 'byId');

const getMyWorkspaceIds = (state: State): TId[] =>
  _.get(stateKey(state), 'myWorkspaceIds');

const getSelectedWorkspaceIds = (state: State): string =>
  _.get(stateKey(state), 'selectedWorkspace');

const getWorkspaceStats = (state: State): any =>
  _.get(stateKey(state), 'workspaceStats');

export const myWorkspaces = (state?: State | null): Workspace[] => {
  if (!state) return [];
  const myWorkspaceIds = getMyWorkspaceIds(state);
  const byId = getById(state);

  return (myWorkspaceIds || []).reduce((current: Workspace[], id: TId) => {
    const workspace = byId[id];

    if (workspace) {
      current = [...current, workspace];
    }

    return current;
  }, [] as Workspace[]);
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
  myWorkspaceStats: workspaceStats,
};

export { workspaceSelectors };
