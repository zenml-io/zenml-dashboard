import { pipelineSelectors } from './pipelines';

const runTest = {
  myPipelines: (state: any) => expect(pipelineSelectors.myPipelines(state)),
  pipelineForId: (id: any, state: any) =>
    expect(pipelineSelectors.pipelineForId(id)(state)),
};

const stateWithData = (pipelines: any) => ({
  persisted: {
    pipelines,
  },
});

describe('myPipelines', () => {
  describe('test null cases', () => {
    it('given undefined or null returns []', () => {
      runTest.myPipelines(null).toEqual([]);
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
        myPipelineIds: ['some-id'],
      };
      runTest.myPipelines(stateWithData(data) as any).toEqual([
        {
          id: 'some-id',
        },
      ]);
    });
  });
});

describe('pipelineForId', () => {
  it('given nil values, returns {}', () => {
    runTest.pipelineForId(null, null).toEqual({});
    runTest.pipelineForId(undefined, null).toEqual({});
    runTest.pipelineForId(null, undefined).toEqual({});
    runTest.pipelineForId(undefined, null).toEqual({});
  });

  describe('give a state', () => {
    const id = 'someId';
    const pipelines = {
      byId: {
        [id]: {
          id,
          anyOtherProps: 'anyOtherProps',
        },
      },
    };

    const state = {
      persisted: {
        pipelines,
      },
    };

    it('given nil values, returns {}', () => {
      runTest.pipelineForId(null, state).toEqual({});
      runTest.pipelineForId(undefined, state).toEqual({});
    });

    it('given not present id, returns {}', () => {
      runTest.pipelineForId('notId', state).toEqual({});
    });

    it('given present id, returns content', () => {
      runTest.pipelineForId(id, state).toEqual(pipelines.byId[id]);
    });
  });
});
