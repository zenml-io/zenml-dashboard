import { runSelectors } from './runs';

const runTest = {
  myRuns: (state: any) => expect(runSelectors.myRuns(state)),
  runsForPipelineId: (id: any, state: any) =>
    expect(runSelectors.runsForPipelineId(id)(state)),
  runForId: (id: any, state: any) => expect(runSelectors.runForId(id)(state)),
};

const stateWithData = (runs: any) => ({
  persisted: {
    runs,
  },
});

describe('myRuns', () => {
  describe('test null cases', () => {
    it('given undefined or null returns []', () => {
      runTest.myRuns(null).toEqual([]);
    });
  });

  describe('test cases with data', () => {
    it('returns the right data', () => {
      const data = {
        byId: {
          'some-id': {
            id: 'some-id',
          },
          'other-id': {
            id: 'other-id',
          },
        },
        myRunIds: ['some-id'],
      };
      runTest.myRuns(stateWithData(data)).toEqual([
        {
          id: 'some-id',
        },
      ]);
    });
  });
});

describe('runsForPipelineId', () => {
  describe('test null cases', () => {
    it('given undefined or null returns []', () => {
      runTest.runsForPipelineId(null, null).toEqual([]);
      runTest.runsForPipelineId(undefined, null).toEqual([]);
      runTest.runsForPipelineId(null, undefined).toEqual([]);
      runTest.runsForPipelineId(undefined, null).toEqual([]);
    });
  });

  describe('given a state', () => {
    const id = 'someId';
    const pipelineId = 'pipelineId';

    const data = {
      byId: {
        [id]: {
          id,
          anyOtherProps: 'anyOtherProps',
        },
      },
      byPipelineId: {
        [pipelineId]: [id],
      },
    };

    it('given nil values, returns []', () => {
      runTest.runsForPipelineId(null, stateWithData(data)).toEqual([]);
      runTest.runsForPipelineId(undefined, stateWithData(data)).toEqual([]);
    });

    it('given not present id, returns []', () => {
      runTest.runsForPipelineId('notId', stateWithData(data)).toEqual([]);
    });

    it('given present id, returns content', () => {
      runTest
        .runsForPipelineId(pipelineId, stateWithData(data))
        .toEqual([data.byId[id]]);
    });
  });
});

describe('runForId', () => {
  it('given nil values, returns {}', () => {
    runTest.runForId(null, null).toEqual({});
    runTest.runForId(undefined, null).toEqual({});
    runTest.runForId(null, undefined).toEqual({});
    runTest.runForId(undefined, null).toEqual({});
  });

  describe('give a state', () => {
    const id = 'someId';
    const runs = {
      byId: {
        [id]: {
          id,
          anyOtherProps: 'anyOtherProps',
        },
      },
    };

    const state = {
      persisted: {
        runs,
      },
    };

    it('given nil values, returns {}', () => {
      runTest.runForId(null, state).toEqual({});
      runTest.runForId(undefined, state).toEqual({});
    });

    it('given not present id, returns {}', () => {
      runTest.runForId('notId', state).toEqual({});
    });

    it('given present id, returns content', () => {
      runTest.runForId(id, state).toEqual(runs.byId[id]);
    });
  });
});
