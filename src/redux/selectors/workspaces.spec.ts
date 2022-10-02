import { workspaceSelectors } from './workspaces';

const runTest = {
  myWorkspaces: (state: any) => expect(workspaceSelectors.myWorkspaces(state)),
  workspaceForId: (id: any, state: any) =>
    expect(workspaceSelectors.workspaceForId(id)(state)),
};

const stateWithData = (workspaces: any) => ({
  persisted: {
    workspaces,
  },
});

describe('myWorkspaces', () => {
  describe('test null cases', () => {
    it('given null returns []', () => {
      runTest.myWorkspaces(null).toEqual([]);
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
        myWorkspaceIds: ['some-id'],
      };
      runTest.myWorkspaces(stateWithData(data) as any).toEqual([
        {
          id: 'some-id',
        },
      ]);
    });
  });
});

describe('workspaceForId', () => {
  it('given nil values, returns {}', () => {
    runTest.workspaceForId(null, null).toEqual({});
    runTest.workspaceForId(undefined, null).toEqual({});
    runTest.workspaceForId(null, undefined).toEqual({});
    runTest.workspaceForId(undefined, null).toEqual({});
  });

  describe('give a state', () => {
    const id = 'someId';
    const workspaces = {
      byId: {
        [id]: {
          id,
          anyOtherProps: 'anyOtherProps',
        },
      },
    };

    const state = {
      persisted: {
        workspaces,
      },
    };

    it('given nil values, returns {}', () => {
      runTest.workspaceForId(null, state).toEqual({});
      runTest.workspaceForId(undefined, state).toEqual({});
    });

    it('given not present id, returns {}', () => {
      runTest.workspaceForId('notId', state).toEqual({});
    });

    it('given present id, returns content', () => {
      runTest.workspaceForId(id, state).toEqual(workspaces.byId[id]);
    });
  });
});
