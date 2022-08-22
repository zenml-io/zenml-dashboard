import _ from 'lodash';

import { State } from '../reducers/billingReducer';

const stateKey = (state: State): State =>
  _.get(state, 'persisted.billing') || {};

const getById = (state: State): Record<TId, TBilling> =>
  _.get(stateKey(state), 'byId');

const getByRunId = (state: State): Record<TId, TId> =>
  _.get(stateKey(state), 'byRunId');

export const billingForRunId = (runId: TId | null | undefined) => (
  state?: State | null,
): TBilling | Record<any, any> => {
  if (!state || !runId) return {};

  const byRunId = getByRunId(state);
  const byId = getById(state);

  if (!byRunId[runId]) return {};

  return byId[byRunId[runId]];
};

const organizationBilling = (state: State): TOrganizationBilling =>
  _.get(state, 'persisted.billing.organizationBilling');

const billingSelectors = {
  billingForRunId,
  organizationBilling,
};

export { billingSelectors };
