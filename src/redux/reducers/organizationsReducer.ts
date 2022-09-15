import { camelCaseArray, camelCaseObject } from '../../utils/camelCase';
import { organizationActionTypes } from '../actionTypes';
import { byKeyInsert, idsInsert } from './reducerHelpers';

export interface State {
  ids: TId[];
  byId: Record<TId, TOrganization>;
  invites: TInvite[];
  owner: TMember | null;
  members: TMember[];
  myOrganizationId: TId | null;
  roles: string[];
  invoices: TInvoice[];
  invite: { id: null, activationToken: null, email: null }
}

export type Action = {
  type: string;
  payload:
    | TOrganization
    | TInvite
    | TInvite[]
    | TMember
    | TMember[]
    | string[]
    | TInvoice[]
};

export const initialState: State = {
  ids: [],
  byId: {},
  invites: [],
  owner: null,
  members: [],
  roles: [],
  invoices: [],
  myOrganizationId: null,
  invite: { id: null, activationToken: null, email: null },
};

const newState = (state: State, organizations: TOrganization[]): State => ({
  ...state,
  ids: idsInsert(state.ids, organizations),
  byId: byKeyInsert(state.byId, organizations),
});

const organizationsReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case organizationActionTypes.getMyOrganization.success: {
      const organization: TOrganization = camelCaseObject(action.payload);

      const myOrganizationId: TId = organization.id;

      return {
        ...newState(state, [organization]),
        myOrganizationId,
      };
    }

    case organizationActionTypes.getInviteForCode.success: {
      const invite: TInvite = camelCaseObject(action.payload);

      return { ...newState(state, []), invites: [invite] };
    }

    case organizationActionTypes.getInvites.success: {
      const invites: TInvite[] = camelCaseArray(action.payload as TInvite[]);

      return { ...newState(state, []), invites: invites || [] };
    }

    case organizationActionTypes.getOwner.success: {
      const owner: TMember = camelCaseObject(action.payload);

      return { ...newState(state, []), owner: owner };
    }

    case organizationActionTypes.getMembers.success: {
      const members: TMember[] = camelCaseArray(action.payload as TMember[]);

      return { ...newState(state, []), members: members || [] };
    }

    case organizationActionTypes.getRoles.success: {
      const roles: string[] = action.payload as string[];

      return { ...newState(state, []), roles: roles || [] };
    }

    case organizationActionTypes.getInvoices.success: {
      const invoices: TInvoice[] = camelCaseArray(action.payload as TInvoice[]);

      return { ...newState(state, []), invoices: invoices || [] };
    }

    case organizationActionTypes.invite.success: {
      const inviteUser = camelCaseObject(action.payload);
      return { ...newState(state, []), invite: inviteUser };
    }

    default:
      return state;
  }
};

export default organizationsReducer;
