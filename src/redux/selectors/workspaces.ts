import _ from 'lodash';
import { Selector } from 'react-redux';

import { State } from '../reducers/workspacesReducer';
import { createSelector } from './createSelector';
import { extractItemFromById } from './utils';

const stateKey = (state: State): State =>
  _.get(state, 'persisted.workspaces') || {};

const getById = (state: State): Record<TId, TWorkspace> =>
  _.get(stateKey(state), 'byId');

const getMyWorkspaceIds = (state: State): TId[] =>
  _.get(stateKey(state), 'myWorkspaceIds');

export const myWorkspaces = (state?: State | null): TWorkspace[] => {
  if (!state) return [];
  const myWorkspaceIds = getMyWorkspaceIds(state);
  const byId = getById(state);

  return (myWorkspaceIds || []).reduce((current: TWorkspace[], id: TId) => {
    const workspace = byId[id];

    if (workspace) {
      current = [...current, workspace];
    }

    return current;
  }, [] as TWorkspace[]);
};

export const workspaceForId = (workspaceId: TId): Selector<any, TWorkspace> =>
  createSelector(getById, extractItemFromById(workspaceId));

const workspaceSelectors = {
  myWorkspaces: myWorkspaces,
  workspaceForId,
};

export { workspaceSelectors };
