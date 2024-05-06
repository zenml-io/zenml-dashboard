import { actionTypes } from './constants';
import { generateApiActionsTypes } from './generateApiActionsTypes';

export const organizationActionTypes = {
  getMyOrganization: generateApiActionsTypes(
    actionTypes.ORGANIZATIONS_GET_MY_ORGANIZATION,
  ),
  getInviteForCode: generateApiActionsTypes(
    actionTypes.ORGANIZATIONS_GET_INVITE_FOR_CODE,
  ),
  getInvites: generateApiActionsTypes(actionTypes.ORGANIZATIONS_GET_INVITES),
  getMembers: generateApiActionsTypes(actionTypes.ORGANIZATIONS_GET_MEMBERS),
  invite: generateApiActionsTypes(actionTypes.ORGANIZATIONS_INVITE),
  deleteInvite: generateApiActionsTypes(
    actionTypes.ORGANIZATIONS_DELETE_INVITE,
  ),
  retryInvoice: generateApiActionsTypes(
    actionTypes.ORGANIZATIONS_RETRY_INVOICE,
  ),
};
