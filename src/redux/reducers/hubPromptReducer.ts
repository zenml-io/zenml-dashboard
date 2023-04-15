import { hubConnectionPromptActionTypes } from '../actionTypes';

export interface State {
  showPopup: boolean;
}

export const initialState: State = {
  showPopup: false,
};

export type Action = {
  type: string;
};

const hubPromptReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case hubConnectionPromptActionTypes.show: {
      return { showPopup: true };
    }
    case hubConnectionPromptActionTypes.hide: {
      return { showPopup: false };
    }
    default:
      return state;
  }
};

export default hubPromptReducer;
