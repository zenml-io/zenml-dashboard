import { loginActionTypes } from '../actionTypes/session';
import sessionReducer from './sessionReducer';

const loginSuccessAction = {
  type: loginActionTypes.success,
  payload: {
    access_token: 'access_token',
  },
};

const runTestsWithAction = ({ action }: { action: any }) => {
  describe('given action for successful signin', () => {
    describe('given an undefined state', () => {
      const { authenticationToken } = sessionReducer(undefined, action);

      it('saves the access token', () => {
        expect(authenticationToken).toEqual('access_token');
      });
    });

    describe('given an existing state', () => {
      const state = {
        authenticationToken: 'access_token',
      };
      const { authenticationToken } = sessionReducer(state, action);

      it('overwrites the access token', () => {
        expect(authenticationToken).toEqual('access_token');
      });
    });
  });

  describe('given any other actions', () => {
    const action = {
      type: 'someAction',
      payload: {},
    };
    const state = {
      authenticationToken: 'access_token',
    };

    it('returns the current state', () => {
      const result = sessionReducer(state, action);

      expect(result).toEqual(state);
    });
  });
};

runTestsWithAction({ action: loginSuccessAction });
