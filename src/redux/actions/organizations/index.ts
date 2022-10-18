import { getMyOrganizationAction } from './getMyOrganizationAction';
import { getInviteByCodeAction } from './getInviteByCodeAction';
import { getInvitesAction } from './getInvitesAction';
import { getOwnerAction } from './getOwnerAction';
import { getMembersAction } from './getMembersAction';
import { getRolesAction } from './getRolesAction';
import { inviteAction } from './inviteAction';
import { deleteInviteAction } from './deleteInviteAction';
import { getInvoicesAction } from './getInvoicesAction';

export const organizationActions = {
  // getMy: getMyOrganizationAction,
  inviteByCode: getInviteByCodeAction,
  getInvites: getInvitesAction,
  getOwner: getOwnerAction,
  getMembers: getMembersAction,
  getRoles: getRolesAction,
  invite: inviteAction,
  deleteInvite: deleteInviteAction,
  getInvoices: getInvoicesAction,
};
