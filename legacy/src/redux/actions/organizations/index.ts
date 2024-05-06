import { getInviteByCodeAction } from './getInviteByCodeAction';
import { getInvitesAction } from './getInvitesAction';
import { getMembersAction } from './getMembersAction';
import { inviteAction } from './inviteAction';
import { deleteInviteAction } from './deleteInviteAction';

export const organizationActions = {
  inviteByCode: getInviteByCodeAction,
  getInvites: getInvitesAction,
  getMembers: getMembersAction,
  invite: inviteAction,
  deleteInvite: deleteInviteAction,
};
