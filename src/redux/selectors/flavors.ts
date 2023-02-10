import _ from 'lodash';
import { Selector } from 'reselect';

import { State } from '../reducers/flavorsReducer';
import { createSelector } from './createSelector';
import { extractItemFromById } from './utils';

const stateKey = (state: State): State =>
  _.get(state, 'persisted.flavors') || {};

const getById = (state: State): Record<TId, TStack> =>
  _.get(stateKey(state), 'byId');

const getMyflavorIds = (state: State): TId[] =>
  _.get(stateKey(state), 'myflavorIds');

const getStackComponentTypes = (state: State): TId[] =>
  _.get(stateKey(state), 'stackComponentTypes');

const getMyFlavorsPaginated = (state: State): any =>
  _.get(stateKey(state), 'paginated');

export const myFlavorsAll = (state?: State | null): TStack[] => {
  if (!state) return [];
  const myflavorIds = getMyflavorIds(state);
  const byId = getById(state);

  return (myflavorIds || []).reduce((current: TStack[], id: TId) => {
    const flavor = byId[id];

    if (flavor) {
      current = [...current, flavor];
    }

    return current;
  }, [] as TStack[]);
};
export const myFlavorByType = (state?: State | null) => {
  if (!state) return [];
  const stackComponentTypes = getStackComponentTypes(state);
  return stackComponentTypes;
};
export const myFlavorsPaginated = (state?: State | null): any => {
  if (!state) return {};
  const paginated = getMyFlavorsPaginated(state);

  return paginated;
};

// export const stackComponentForId = (
//   stackComponentId: TId,
// ): Selector<any, TStack> =>
//   createSelector(getById, extractItemFromById(stackComponentId));

const flavorSelectors = {
  myFlavorByType: myFlavorByType,
  myFlavorsAll: myFlavorsAll,
  myFlavorsPaginated: myFlavorsPaginated,
  // stackComponentForId,
};

export { flavorSelectors };
