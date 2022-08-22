import { camelCaseObject } from '../../utils';
import { stripeActionTypes } from '../actionTypes';

export interface State {
  url: string | null;
  currentPaymentMethod: TPaymentMethod | null;
  currentSubscription: TSubscription | null;
}

export type Action = {
  type: string;
  payload: string | TPaymentMethod | TSubscription;
};

export const initialState: State = {
  url: null,
  currentPaymentMethod: null,
  currentSubscription: null,
};

const stripeReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case stripeActionTypes.getStripePortalUrl.success: {
      const url: string = action.payload as string;
      return { ...state, url };
    }

    case stripeActionTypes.getPaymentMethod.success: {
      const payload = camelCaseObject(action.payload) as TPaymentMethod;
      return { ...state, currentPaymentMethod: payload.id ? payload : null };
    }

    case stripeActionTypes.getSubscription.success: {
      const payload = camelCaseObject(action.payload) as TSubscription;
      return { ...state, currentSubscription: payload };
    }

    default:
      return state;
  }
};

export default stripeReducer;
