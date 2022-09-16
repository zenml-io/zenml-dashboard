import { useEffect, useState } from 'react';
import { loggedOutRoute, toasterTypes } from '../../../../constants';
import { showToasterAction } from '../../../../redux/actions';
import { signUpAction } from '../../../../redux/actions/session/signupAction';
import { useDispatch, usePushRoute } from '../../../hooks';
import { translate } from './translate';
import { useLocation } from 'react-router-dom';

interface ServiceInterface {
  signup: () => void;
  hasSubmittedWithErrors: boolean;
  username: string,
  setUsername: (username: string) => void,
  email: string;
  setEmail: (email: string) => void;
  fullName: string,
  setFullName: (fullName: string) => void,
  password: string;
  setPassword: (password: string) => void;
  token: any,
  loading: boolean;
}

export const useService = (): ServiceInterface => {

  const location = useLocation()
  const params = new URLSearchParams(location.search)

  const preEmail = params.get('email')
  const token = params.get('token')

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [hasSubmittedWithErrors, setHasSubmittedWithErrors] = useState(false);

  const dispatch = useDispatch();
  const { push } = usePushRoute();

  useEffect(() => {
    setUsername(preEmail ? preEmail : '');
    setEmail(preEmail ? preEmail : '');
  }, [preEmail]);

  return {
    signup: () => {
      setLoading(true);
      setHasSubmittedWithErrors(true);
      if (username.trim() !== '' && email.trim() !== '' && password.trim() !== '') {
        dispatch(
          signUpAction({
            username,
            email,
            fullName,
            password,
            token,
            onFailure: (errorMessage) => {
              dispatch(
                showToasterAction({
                  description: errorMessage,
                  type: toasterTypes.failure,
                }),
              );
              setLoading(false);
            },
            onSuccess: () => {
              dispatch(
                showToasterAction({
                  description: translate('toasts.successfulSignup.text'),
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
    username,
    setUsername,
    email,
    setEmail,
    fullName,
    setFullName,
    password,
    setPassword,
    token,
    loading,
  };
};
