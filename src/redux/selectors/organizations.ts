import _ from 'lodash';
import { State } from '../reducers/organizationsReducer';

const stateKey = (state: State): State =>
  _.get(state, 'persisted.organizations') || {};

const getById = (state: State): Record<TId, TOrganization> =>
  _.get(stateKey(state), 'byId');

const getMyOrganizationId = (state: State): TId | null =>
  _.get(stateKey(state), 'myOrganizationId');

export const myOrganization = (state: State): TOrganization | null => {
  const myOrganizationId = getMyOrganizationId(state);
  const byId = getById(state);

  if (!myOrganizationId || !byId) return null;

  return byId[myOrganizationId];
};

const inviteForCode = (state: State): any[] =>
  _.get(stateKey(state), 'inviteCode');

const myMembers = (state: State): TMember[] =>
  _.get(stateKey(state), 'members');

const getInvites = (state: State): TInvite[] =>
  _.get(stateKey(state), 'invites');

const invite = (
  state: State,
): { id: null; activationToken: null; email: null } =>
  _.get(stateKey(state), 'invite');

const organizationSelectors = {
  myOrganization: myOrganization,
  myMembers: myMembers,
  inviteForCode: inviteForCode,
  invites: getInvites,
  invite,
};

export { organizationSelectors };
