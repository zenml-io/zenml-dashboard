import { userSelectors } from './users';

const runTest = {
  myUser: (state: any) => expect(userSelectors.myUser(state)),
  userForId: (id: any, state: any) =>
    expect(userSelectors.userForId(id)(state)),
};

describe('myUser', () => {
  it('given nil values, returns null', () => {
    runTest.myUser(null).toEqual(null);
    runTest.myUser(undefined).toEqual(null);
  });

  describe('give a state', () => {
    const id = 'someId';
    const users = {
      byId: {
        [id]: {
          id,
          anyOtherProps: 'anyOtherProps',
        },
      },
      myUserId: id,
    };

    const state = {
      persisted: {
        users,
      },
    };

    it('given nil values, returns null', () => {
      runTest.myUser(null).toEqual(null);
      runTest.myUser(undefined).toEqual(null);
    });

    it('given present user, returns content', () => {
      runTest.myUser(state).toEqual(users.byId[id]);
    });
  });
});

describe('userForId', () => {
  it('given nil values, returns {}', () => {
    runTest.userForId(null, null).toEqual({});
    runTest.userForId(undefined, null).toEqual({});
    runTest.userForId(null, undefined).toEqual({});
    runTest.userForId(undefined, null).toEqual({});
  });

  describe('give a state', () => {
    const id = 'someId';
    const users = {
      byId: {
        [id]: {
          id,
          anyOtherProps: 'anyOtherProps',
        },
      },
    };

    const state = {
      persisted: {
        users,
      },
    };

    it('given nil values, returns {}', () => {
      runTest.userForId(null, state).toEqual({});
      runTest.userForId(undefined, state).toEqual({});
    });

    it('given not present id, returns {}', () => {
      runTest.userForId('notId', state).toEqual({});
    });

    it('given present id, returns content', () => {
      runTest.userForId(id, state).toEqual(users.byId[id]);
    });
  });
});
