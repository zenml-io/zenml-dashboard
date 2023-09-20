import {
  authoriseHubActionTypes,
  disconnectHubActionTypes,
  loginActionTypes,
  signupActionTypes,
  updateAccessTokenActionType,
} from '../actionTypes';

type State = {
  authenticationToken?: string;
  hubToken?: string;
};

type Action = {
  type: string;
  payload: {
    access_token?: string;
  };
};

export const initialState: State = {
  authenticationToken: undefined,
  hubToken: undefined,
};

const sessionReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case updateAccessTokenActionType: {
      const { token } = action.payload as any;
      return {
        ...state,
        authenticationToken: token,
      };
    }
    case loginActionTypes.success: {
      const { access_token } = action.payload;

      return {
        ...state,
        authenticationToken: access_token,
      };
    }
    case signupActionTypes.success: {
      const { access_token } = action.payload;

      return {
        ...state,
        authenticationToken: access_token,
      };
    }
    case authoriseHubActionTypes.success: {
      const { access_token } = action.payload;

      return {
        ...state,
        hubToken: access_token,
      };
    }
    case disconnectHubActionTypes.success: {
      return {
        ...state,
        hubToken: undefined,
      };
    }

    default:
      return state;
  }
};

export default sessionReducer;
