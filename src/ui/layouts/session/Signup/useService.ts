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
  userId: string;
  username: string,
  setUsername: (username: string) => void,
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

  const preUsername = params.get('username')
  const token = params.get('token')
  const id = params.get('user')

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [hasSubmittedWithErrors, setHasSubmittedWithErrors] = useState(false);

  const userId = id ? id : username

  const dispatch = useDispatch();
  const { push } = usePushRoute();

  useEffect(() => {
    setUsername(preUsername ? preUsername : '');
  }, [preUsername]);

  return {
    signup: () => {
      setLoading(true);
      setHasSubmittedWithErrors(true);
      if (username.trim() !== '' && password.trim() !== '') {
        dispatch(
          signUpAction({
            userId,
            username,
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
    userId,
    username,
    setUsername,
    fullName,
    setFullName,
    password,
    setPassword,
    token,
    loading,
  };
};
