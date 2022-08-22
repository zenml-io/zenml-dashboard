import { camelCaseObject } from '../../utils/camelCase';
import { billingActionTypes } from '../actionTypes';
import { byKeyInsert, idsInsert } from './reducerHelpers';

export interface State {
  ids: TId[];
  byId: Record<TId, TBilling>;
  byRunId: Record<TId, TId>;
  organizationBilling: TOrganizationBilling;
}

export type Action = {
  type: string;
  payload: TBilling | TOrganizationBilling;
};

export const initialState: State = {
  ids: [],
  byId: {},
  byRunId: {},
  organizationBilling: {
    totalProcessedDatapoints: 0,
    costTotal: 0,
    processedDatapointsThisMonth: 0,
    costThisMonth: 0,
  },
};

const newState = (state: State, runs: TBilling[]): State => ({
  ...state,
  ids: idsInsert(state.ids, runs),
  byId: byKeyInsert(state.byId, runs),
});

const billingReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case billingActionTypes.getBillingForRunId.success: {
      const billing = camelCaseObject(action.payload);

      const byRunId: Record<TId, TId> = {};
      byRunId[billing.pipelineRunId] = billing.id;

      return { ...state, ...newState(state, [billing]), byRunId };
    }

    case billingActionTypes.getOrganizationBilling.success: {
      const organizationBilling = camelCaseObject(action.payload);

      return { ...state, organizationBilling: organizationBilling };
    }

    default:
      return state;
  }
};

export default billingReducer;
