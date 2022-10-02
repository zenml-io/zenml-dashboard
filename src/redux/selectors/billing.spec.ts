import { billingSelectors } from './billing';

const runTest = {
  billingForRunId: (id: any, state: any) =>
    expect(billingSelectors.billingForRunId(id)(state)),
};

describe('billingForRunId', () => {
  it('given nil values, returns {}', () => {
    runTest.billingForRunId(null, null).toEqual({});
    runTest.billingForRunId(undefined, null).toEqual({});
    runTest.billingForRunId(null, undefined).toEqual({});
    runTest.billingForRunId(undefined, null).toEqual({});
  });

  describe('give a state', () => {
    const runId = 'runId';
    const id = 'someId';
    const billing = {
      byId: {
        [id]: {
          id,
          anyOtherProps: 'anyOtherProps',
        },
      },
      byRunId: {
        [runId]: id,
      },
    };

    const state = {
      persisted: {
        billing,
      },
    };

    it('given nil values, returns {}', () => {
      runTest.billingForRunId(null, state).toEqual({});
      runTest.billingForRunId(undefined, state).toEqual({});
    });

    it('given not present id, returns {}', () => {
      runTest.billingForRunId('notId', state).toEqual({});
    });

    it('given present id, returns content', () => {
      runTest.billingForRunId(runId, state).toEqual(billing.byId[id]);
    });
  });
});
