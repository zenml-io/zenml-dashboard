import _ from 'lodash';
import { Selector } from 'react-redux';

import { State } from '../reducers/usersReducer';
import { createSelector } from './createSelector';
import { extractItemFromById } from './utils';
import { User } from '../../api/types';

const stateKey = (state: State): State => _.get(state, 'persisted.users') || {};

const getById = (state: State): Record<TId, User> =>
  _.get(stateKey(state), 'byId');

const getMyUserId = (state: State): TId | null =>
  _.get(stateKey(state), 'myUserId');

export const myUser = (state: State): User | null => {
  const myUserId = getMyUserId(state);
  const byId = getById(state);

  if (!myUserId || !byId) return null;

  return byId[myUserId];
};

export const userForId = (userId: TId): Selector<State, User> =>
  createSelector(getById, extractItemFromById(userId));

const userSelectors = {
  myUser,
  userForId,
};

export { userSelectors };
