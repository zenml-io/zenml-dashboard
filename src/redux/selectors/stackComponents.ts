import _ from 'lodash';
import { Selector } from 'reselect';

import { State } from '../reducers/stackComponentsReducer';
import { createSelector } from './createSelector';
import { extractItemFromById } from './utils';
import { StackComponent } from '../../api/types';

const stateKey = (state: State): State =>
  _.get(state, 'persisted.stackComponents') || {};

const getById = (state: State): Record<TId, StackComponent> =>
  _.get(stateKey(state), 'byId');

const getMyStackComponentIds = (state: State): TId[] =>
  _.get(stateKey(state), 'myStackComponentIds');

const geStackComponentTypes = (state: State): TId[] =>
  _.get(stateKey(state), 'stackComponentTypes');

const getMyStackComponentsPaginated = (state: State): any =>
  _.get(stateKey(state), 'paginated');

export const mystackComponents = (state?: State | null): StackComponent[] => {
  if (!state) return [];
  const myStackComponentIds = getMyStackComponentIds(state);
  const byId = getById(state);

  return (myStackComponentIds || []).reduce(
    (current: StackComponent[], id: TId) => {
      const stackComponent = byId[id];

      if (stackComponent) {
        current = [...current, stackComponent];
      }

      return current;
    },
    [] as StackComponent[],
  );
};
export const stackComponentTypes = (state?: State | null) => {
  if (!state) return [];
  const stackComponentTypes = geStackComponentTypes(state);
  return stackComponentTypes;
};
export const mystackComponentsPaginated = (state?: State | null): any => {
  if (!state) return {};
  const paginated = getMyStackComponentsPaginated(state);

  return paginated;
};

export const stackComponentForId = (
  stackComponentId: TId,
): Selector<any, StackComponent> =>
  createSelector(getById, extractItemFromById(stackComponentId));

const stackComponentSelectors = {
  stackComponentTypes: stackComponentTypes,
  mystackComponents: mystackComponents,
  mystackComponentsPaginated: mystackComponentsPaginated,
  stackComponentForId,
};

export { stackComponentSelectors };
