import { SHOW_TOASTER_ACTION_TYPE } from '../actionTypes';

interface State {
  description: string | null;
  type?: TToasterTypes | null;
}

interface Action {
  type: string;
  payload: {
    description: string | null;
    type?: TToasterTypes;
  };
}

export const initialState: State = {
  description: null,
  type: null,
};

export const toaster = (state: State = initialState, action: Action): State => {
  if (action.type === SHOW_TOASTER_ACTION_TYPE) {
    return {
      description: action.payload.description,
      type: action.payload.type,
    };
  }

  return state;
};

export default toaster;
