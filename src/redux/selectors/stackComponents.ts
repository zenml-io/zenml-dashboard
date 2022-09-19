import _ from 'lodash';
import { Selector } from 'reselect';

import { State } from '../reducers/stackComponentsReducer';
import { createSelector } from './createSelector';
import { extractItemFromById } from './utils';

const stateKey = (state: State): State =>
  _.get(state, 'persisted.stackComponents') || {};

const getById = (state: State): Record<TId, TStack> =>
  _.get(stateKey(state), 'byId');

const getMyStackComponentIds = (state: State): TId[] =>
  _.get(stateKey(state), 'myStackComponentIds');

const getStackComponentTypes = (state: State): TId[] =>
  _.get(stateKey(state), 'stackComponentTypes');

export const mystackComponents = (state?: State | null): TStack[] => {
  if (!state) return [];
  const myStackComponentIds = getMyStackComponentIds(state);
  const byId = getById(state);

  return (myStackComponentIds || []).reduce((current: TStack[], id: TId) => {
    const stackComponent = byId[id];

    if (stackComponent) {
      current = [...current, stackComponent];
    }

    return current;
  }, [] as TStack[]);
};
export const stackComponentTypes = (state?: State | null) => {
  if (!state) return [];
  const stackComponentTypes = getStackComponentTypes(state);
  return stackComponentTypes;
};

export const stackComponentForId = (
  stackComponentId: TId,
): Selector<any, TStack> =>
  createSelector(getById, extractItemFromById(stackComponentId));

const stackComponentSelectors = {
  stackComponentTypes: stackComponentTypes,
  mystackComponents: mystackComponents,
  stackComponentForId,
};

export { stackComponentSelectors };
