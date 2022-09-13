import _ from 'lodash';
import { Selector } from 'reselect';

import { State } from '../reducers/stacksReducer';
import { createSelector } from './createSelector';
import { extractItemFromById } from './utils';

const stateKey = (state: State): State =>
  _.get(state, 'persisted.stacks') || {};

const getById = (state: State): Record<TId, TPipeline> =>
  _.get(stateKey(state), 'byId');

const getMyPipelineIds = (state: State): TId[] =>
  _.get(stateKey(state), 'mystackIds');

export const mystacks = (state?: State | null): TPipeline[] => {
  if (!state) return [];
  const myPipelineIds = getMyPipelineIds(state);
  const byId = getById(state);

  return (myPipelineIds || []).reduce((current: TPipeline[], id: TId) => {
    const pipeline = byId[id];

    if (pipeline) {
      current = [...current, pipeline];
    }

    return current;
  }, [] as TPipeline[]);
};

export const stackForId = (pipelineId: TId): Selector<any, TPipeline> =>
  createSelector(getById, extractItemFromById(pipelineId));

const stackSelectors = {
  mystacks: mystacks,
  stackForId,
};

export { stackSelectors };
