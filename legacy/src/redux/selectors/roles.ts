import _ from 'lodash';

import { State } from '../reducers/rolesReducer';

const stateKey = (state: State): State => _.get(state, 'persisted.roles') || {};

export const getRoles = (state?: State | null): Roles[] => {
  if (!state) return [];

  const roles: any = _.get(stateKey(state), 'roles');
  return roles;
};

const rolesSelectors = {
  getRoles: getRoles,
};

export { rolesSelectors };
