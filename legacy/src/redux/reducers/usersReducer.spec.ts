import usersReducer from './usersReducer';
import { userActionTypes } from '../actionTypes';

const user = {
  id: '1245',
  fullName: 'name',
} as TUser;

const getMyUserSuccessful = (currentState: any, payload: TUser = user): any => {
  const action = {
    type: userActionTypes.getMyUser.success,
    payload,
  };

  const nextState = usersReducer(currentState, action);
  return { nextState };
};

const testStateAfterSuccessfulMyUserFetch = (state: {
  ids: TId[];
  byId: Record<TId, TUser>;
  myUserId: TId | null;
}): void => {
  const { nextState } = getMyUserSuccessful(state);
  it('ids is added to the store', () => {
    expect(nextState.ids).toEqual(['other-id', user.id]);
  });

  it('byIds is added to the store', () => {
    const byId = {
      [user.id]: user,
      ['other-id']: user,
    };
    expect(nextState.byId).toEqual(byId);
  });

  it('myUserId added to the store', () => {
    expect(nextState.myUserId).toEqual(user.id);
  });
};

describe('given a successful getMyUser action', () => {
  describe('The store has data, adds the user', () => {
    const byId = {
      ['other-id']: user,
    };
    const ids = ['other-id'];
    testStateAfterSuccessfulMyUserFetch({
      byId,
      ids,
      myUserId: 'other-id',
    });
  });
});

const userForIdSuccessful = (currentState: any): any => {
  const action = {
    type: userActionTypes.getUserForId.success,
    payload: user,
  };

  const nextState = usersReducer(currentState, action);
  return { nextState };
};

const testStateAfterSuccessfulUserForId = (state: {
  ids: never[] | string[];
  byId: { 'other-id': TUser };
}): void => {
  const { nextState } = userForIdSuccessful(state);
  it('ids is added to the store', () => {
    expect(nextState.ids).toEqual(['other-id', user.id]);
  });

  it('byIds is added to the store', () => {
    const byId = {
      [user.id]: user,
      ['other-id']: user,
    };
    expect(nextState.byId).toEqual(byId);
  });
};

describe('given a successful user for id action', () => {
  describe('The store has data, replaces everything that was updated', () => {
    const byId = {
      ['other-id']: user,
    };
    const ids = ['other-id'];
    testStateAfterSuccessfulUserForId({
      byId,
      ids,
    });
  });
});
