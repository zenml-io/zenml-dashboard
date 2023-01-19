import { camelCaseArray, camelCaseObject } from '../../utils/camelCase';
import { organizationActionTypes } from '../actionTypes';
import { byKeyInsert, idsInsert } from './reducerHelpers';

export interface State {
  ids: TId[];
  byId: Record<TId, TOrganization>;
  inviteCode: any;
  invites: TInvite[];
  owner: TMember | null;
  members: any[];
  myOrganizationId: TId | null;
  roles: string[];
  invoices: TInvoice[];
  invite: { id: null; activationToken: null; email: null };
  paginated: any;
}

export type Action = {
  type: string;
  payload: any;

  // | TOrganization
  // | TInvite
  // | TInvite[]
  // | TMember
  // | any[]
  // | string[]
  // | TInvoice[];
};

export const initialState: State = {
  ids: [],
  byId: {},
  invites: [],
  inviteCode: null,
  owner: null,
  members: [],
  roles: [],
  invoices: [],
  myOrganizationId: null,
  invite: { id: null, activationToken: null, email: null },
  paginated: {},
};

const newState = (
  state: State,
  organizations: TOrganization[],
  pagination?: any,
): State => ({
  ...state,
  ids: idsInsert(state.ids, organizations),
  byId: byKeyInsert(state.byId, organizations),
  paginated: {
    page: pagination.page,
    size: pagination.size,
    totalPages: pagination.total_pages,
    totalitem: pagination.total,
  },
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
      const inviteCode: any = camelCaseObject(action.payload);

      return {
        ...newState(state, []),
        inviteCode: inviteCode?.activationToken,
      };
    }

    case organizationActionTypes.getInvites.success: {
      const invites: TInvite[] = camelCaseArray(action.payload as TInvite[]);

      return { ...newState(state, []), invites: invites || [] };
    }

    case organizationActionTypes.getMembers.success: {
      const members: TMember[] = camelCaseArray(
        action.payload.items as TMember[],
      );

      return { ...newState(state, [], action.payload), members: members || [] };
    }

    // case pipelineActionTypes.getMyPipelines.success: {
    //   const pipelines: TPipeline[] = camelCaseArray(
    //     action.payload.items as PipelinesPayload,
    //   );

    //   const myPipelineIds: TId[] = pipelines.map(
    //     (pipeline: TPipeline) => pipeline.id,
    //   );

    //   return { ...newState(state, pipelines, action.payload), myPipelineIds };
    // }

    case organizationActionTypes.invite.success: {
      const inviteUser = camelCaseObject(action.payload);
      return { ...newState(state, []), invite: inviteUser };
    }

    default:
      return state;
  }
};

export default organizationsReducer;
