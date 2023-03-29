import _ from 'lodash';
import { Selector } from 'reselect';

import { State } from '../reducers/secretsReducer';
import { createSelector } from './createSelector';
import { extractItemFromById } from './utils';

const stateKey = (state: State): State =>
  _.get(state, 'persisted.secrets') || {};

const getById = (state: State): Record<TId, any> =>
  _.get(stateKey(state), 'byId');

const getMySecretIds = (state: State): TId[] =>
  _.get(stateKey(state), 'mySecretIds');

const getMySecretPaginated = (state: State): any =>
  _.get(stateKey(state), 'paginated');

export const mySecrets = (state?: State | null): any[] => {
  if (!state) return [];
  const mySecretIds = getMySecretIds(state);
  const byId = getById(state);

  return (mySecretIds || []).reduce((current: any[], id: TId) => {
    const secret = byId[id];

    if (secret) {
      current = [...current, secret];
    }

    return current;
  }, [] as any[]);
};

export const mySecretsPaginated = (state?: State | null): any => {
  if (!state) return {};
  const paginated = getMySecretPaginated(state);

  return paginated;
};

export const secretForId = (secretId: TId): Selector<any, any> =>
  createSelector(getById, extractItemFromById(secretId));

const secretSelectors = {
  mySecretsPaginated: mySecretsPaginated,
  mySecrets: mySecrets,
  secretForId,
};

export { secretSelectors };
