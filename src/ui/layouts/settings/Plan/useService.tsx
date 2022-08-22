import { useState } from 'react';
import {
  STRIPE_EXPLORER_SUBSCRIPTION_TYPE,
  STRIPE_UNLIMITED_SUBSCRIPTION_TYPE,
} from '../../../../constants';
import { stripeActions, showToasterAction } from '../../../../redux/actions';
import { useDispatch } from '../../../hooks';

export const useService = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();

  const showErrorToaster = (message: string) => {
    dispatch(
      showToasterAction({
        type: 'failure',
        description: message,
      }),
    );
  };

  return {
    setPopupOpen,
    submitting,
    popupOpen,
    showErrorToaster,
    switchToUnlimited: () => {
      setSubmitting(true);
      dispatch(
        stripeActions.updateSubscription({
          id: STRIPE_UNLIMITED_SUBSCRIPTION_TYPE,
          onSuccess: () => {
            setPopupOpen(false);
            dispatch(
              stripeActions.getSubscription({
                onSuccess: () => {
                  dispatch(
                    showToasterAction({
                      type: 'success',
                      description: 'Subscription updated!',
                    }),
                  );
                  setSubmitting(false);
                },
                onFailure: () => {
                  setSubmitting(false);
                },
              }),
            );
          },
          onFailure: () => {
            setSubmitting(false);

            dispatch(
              showToasterAction({
                type: 'failure',
                description: 'Something went wrong!',
              }),
            );
          },
        }),
      );
    },
    switchToExplorer: () => {
      setSubmitting(true);

      dispatch(
        stripeActions.updateSubscription({
          id: STRIPE_EXPLORER_SUBSCRIPTION_TYPE,
          onSuccess: () => {
            setPopupOpen(false);
            dispatch(
              stripeActions.getSubscription({
                onSuccess: () => {
                  dispatch(
                    showToasterAction({
                      type: 'success',
                      description: 'Subscription updated!',
                    }),
                  );
                  setSubmitting(false);
                },
                onFailure: () => {
                  setSubmitting(false);
                },
              }),
            );
          },
          onFailure: () => {
            setSubmitting(false);

            dispatch(
              showToasterAction({
                type: 'failure',
                description: 'Something went wrong!',
              }),
            );
          },
        }),
      );
    },
  };
};
