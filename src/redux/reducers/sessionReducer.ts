import { loginActionTypes, signupActionTypes } from '../actionTypes';

type State = {
  authenticationToken?: string;
};

type Action = {
  type: string;
  payload: {
    access_token?: string;
  };
};

export const initialState: State = {
  authenticationToken: undefined,
};

const sessionReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case loginActionTypes.success: {
      const accessToken = action.payload.access_token;

      return {
        authenticationToken: accessToken,
      };
    }
    case signupActionTypes.success: {
      const accessToken = action.payload.access_token;

      return {
        authenticationToken: accessToken,
      };
    }

    default:
      return state;
  }
};

export default sessionReducer;
