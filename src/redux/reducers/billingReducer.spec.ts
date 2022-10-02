import { billingActionTypes } from '../actionTypes';
import billingReducer from './billingReducer';

const billing = { id: 'billingId', pipelineRunId: 'runId' } as TBilling;

const billingForRunIdSuccessful = (currentState: any): any => {
  const action = {
    type: billingActionTypes.getBillingForRunId.success,
    payload: billing,
  };

  const nextState = billingReducer(currentState, action);
  return { nextState };
};

const testStateAfterSuccessfulBillingForRunId = (state: {
  ids: never[] | string[];
  byId: { 'other-id': TBilling };
}): void => {
  const { nextState } = billingForRunIdSuccessful(state);
  it('ids is added to the store', () => {
    expect(nextState.ids).toEqual(['other-id', billing.id]);
  });

  it('byRunId is added to the store', () => {
    const byRunId = {
      [billing.pipelineRunId]: billing.id,
    };

    expect(nextState.byRunId).toEqual(byRunId);
  });

  it('byIds is added to the store', () => {
    const byId = {
      [billing.id]: billing,
      ['other-id']: billing,
    };
    expect(nextState.byId).toEqual(byId);
  });
};

describe('given a successful billing for run id action', () => {
  describe('The store has data, replaces everything that was updated', () => {
    const byId = {
      ['other-id']: billing,
    };
    const ids = ['other-id'];
    testStateAfterSuccessfulBillingForRunId({
      byId,
      ids,
    });
  });
});
