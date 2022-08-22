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
  getOwner: generateApiActionsTypes(actionTypes.ORGANIZATIONS_GET_OWNER),
  getMembers: generateApiActionsTypes(actionTypes.ORGANIZATIONS_GET_MEMBERS),
  getRoles: generateApiActionsTypes(actionTypes.ORGANIZATIONS_GET_ROLES),
  invite: generateApiActionsTypes(actionTypes.ORGANIZATIONS_INVITE),
  deleteInvite: generateApiActionsTypes(
    actionTypes.ORGANIZATIONS_DELETE_INVITE,
  ),
  getInvoices: generateApiActionsTypes(actionTypes.ORGANIZATIONS_GET_INVOICES),
  retryInvoice: generateApiActionsTypes(
    actionTypes.ORGANIZATIONS_RETRY_INVOICE,
  ),
};
