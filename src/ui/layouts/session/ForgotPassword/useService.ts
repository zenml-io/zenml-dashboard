import { useState } from 'react';
import { loggedOutRoute, toasterTypes } from '../../../../constants';
import { showToasterAction } from '../../../../redux/actions';
import { forgotAction } from '../../../../redux/actions/session/forgotAction';
import { useDispatch, usePushRoute } from '../../../hooks';
import { translate } from './translate';

interface ServiceInterface {
  forgot: () => void;
  hasSubmittedWithErrors: boolean;
  email: string;
  setEmail: (email: string) => void;
  loading: boolean;
}

export const useService = (): ServiceInterface => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [hasSubmittedWithErrors, setHasSubmittedWithErrors] = useState(false);

  const dispatch = useDispatch();
  const { push } = usePushRoute();

  return {
    forgot: () => {
      setLoading(true);
      setHasSubmittedWithErrors(true);
      if (email.trim() !== '') {
        dispatch(
          forgotAction({
            password: '',
            email,
            onFailure: () => {
              dispatch(
                showToasterAction({
                  description: translate('toasts.failed.text'),
                  type: toasterTypes.failure,
                }),
              );
              setLoading(false);
            },
            onSuccess: () => {
              dispatch(
                showToasterAction({
                  description: translate('toasts.successful.text'),
                  type: toasterTypes.success,
                }),
              );
              push(loggedOutRoute);
              setLoading(false);
            },
          }),
        );
      }
    },
    hasSubmittedWithErrors,
    email,
    setEmail,
    loading,
  };
};
