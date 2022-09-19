import _ from 'lodash';
// import { Selector } from 'reselect';
// import { createSelector } from './createSelector';

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

// export const inviteForCode = (
//   code: string | null,
// ): Selector<any, TInvite | undefined> =>
//   createSelector(getInvites, (invites): TInvite | undefined => {
//     const invite = invites && invites.find((i) => i.code === code);
//     return invite;
//   });

const inviteForCode = (state: State): any[] =>  
  _.get(stateKey(state), 'inviteCode');

const getOwner = (state: State): TMember | null =>
  _.get(stateKey(state), 'owner');

const myMembers = (state: State): TMember[] =>
  _.get(stateKey(state), 'members');

const getInvites = (state: State): TInvite[] =>
  _.get(stateKey(state), 'invites');

const getRoles = (state: State): string[] => _.get(stateKey(state), 'roles');

const getInvoices = (state: State): TInvoice[] =>
  _.get(stateKey(state), 'invoices');

const invite = (state: State): { id: null, activationToken: null, email: null } =>
  _.get(stateKey(state), 'invite');

const organizationSelectors = {
  myOrganization: myOrganization,
  myMembers: myMembers,
  inviteForCode: inviteForCode,
  invites: getInvites,
  roles: getRoles,
  owner: getOwner,
  invoices: getInvoices,
  invite,
};

export { organizationSelectors };
