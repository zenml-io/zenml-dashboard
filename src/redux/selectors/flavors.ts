import _ from 'lodash';
import { Selector } from 'reselect';

import { State } from '../reducers/flavorsReducer';
import { createSelector } from './createSelector';
import { extractItemFromById } from './utils';
import { Flavor } from '../../api/types';

const stateKey = (state: State): State =>
  _.get(state, 'persisted.flavors') || {};

const getById = (state: State): Record<TId, Flavor> =>
  _.get(stateKey(state), 'byId');

const getMyflavorIds = (state: State): TId[] =>
  _.get(stateKey(state), 'myflavorIds');

const getFlavorTypes = (state: State): TId[] =>
  _.get(stateKey(state), 'getFlavorTypes');

const getMyFlavorsPaginated = (state: State): any =>
  _.get(stateKey(state), 'paginated');

export const myFlavorsAll = (state?: State | null): Flavor[] => {
  if (!state) return [];
  const myflavorIds = getMyflavorIds(state);
  const byId = getById(state);

  return (myflavorIds || []).reduce((current: Flavor[], id: TId) => {
    const flavor = byId[id];

    if (flavor) {
      current = [...current, flavor];
    }

    return current;
  }, [] as Flavor[]);
};
export const myFlavorByType = (state?: State | null) => {
  if (!state) return [];
  const flavorTyps = getFlavorTypes(state);
  return flavorTyps;
};
export const myFlavorsPaginated = (state?: State | null): any => {
  if (!state) return {};
  const paginated = getMyFlavorsPaginated(state);

  return paginated;
};

export const flavorForId = (id: TId): Selector<any, Flavor> =>
  createSelector(getById, extractItemFromById(id));

const flavorSelectors = {
  myFlavorByType: myFlavorByType,
  myFlavorsAll: myFlavorsAll,
  myFlavorsPaginated: myFlavorsPaginated,
  flavorForId,
};

export { flavorSelectors };
