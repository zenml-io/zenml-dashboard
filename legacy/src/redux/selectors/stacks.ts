import _ from 'lodash';
import { Selector } from 'reselect';

import { State } from '../reducers/stacksReducer';
import { createSelector } from './createSelector';
import { extractItemFromById } from './utils';
import { Stack } from '../../api/types';

const stateKey = (state: State): State =>
  _.get(state, 'persisted.stacks') || {};

const getById = (state: State): Record<TId, Stack> =>
  _.get(stateKey(state), 'byId');

const getMyStackIds = (state: State): TId[] =>
  _.get(stateKey(state), 'myStackIds');

const getMyStackPaginated = (state: State): any =>
  _.get(stateKey(state), 'paginated');

export const mystacks = (state?: State | null): Stack[] => {
  if (!state) return [];
  const myStackIds = getMyStackIds(state);
  const byId = getById(state);

  return (myStackIds || []).reduce((current: Stack[], id: TId) => {
    const stack = byId[id];

    if (stack) {
      current = [...current, stack];
    }

    return current;
  }, [] as Stack[]);
};

export const mystacksPaginated = (state?: State | null): any => {
  if (!state) return {};
  const paginated = getMyStackPaginated(state);

  return paginated;
};

export const stackForId = (stackId: TId): Selector<any, Stack> =>
  createSelector(getById, extractItemFromById(stackId));

const stackSelectors = {
  mystacksPaginated: mystacksPaginated,
  mystacks: mystacks,
  stackForId,
};

export { stackSelectors };
