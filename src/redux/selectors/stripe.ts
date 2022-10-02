import _ from 'lodash';
import { State } from '../reducers/stripeReducer';

const billingUrl = (state: State): string =>
  _.get(state, 'persisted.stripe.url');

const currentPaymentMethod = (state: State): TPaymentMethod | null =>
  _.get(state, 'persisted.stripe.currentPaymentMethod');

const currentSubscription = (state: State): TSubscription | null =>
  _.get(state, 'persisted.stripe.currentSubscription');

const stripeSelectors = {
  billingUrl,
  currentPaymentMethod,
  currentSubscription,
};

export { stripeSelectors };
