import { useState } from 'react';
import { toasterTypes } from '../../../../constants';
import {
  projectsActions,
  showToasterAction,
  stackComponentsActions,
  userActions,
} from '../../../../redux/actions';
import { loginAction } from '../../../../redux/actions/session/loginAction';
import { useDispatch, usePushRoute } from '../../../hooks';
import { translate } from './translate';
import { routePaths } from '../../../../routes/routePaths';

interface ServiceInterface {
  login: () => void;
  hasSubmittedWithErrors: boolean;
  username: string;
  setUsername: (password: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loading: boolean;
}

export const useService = (): ServiceInterface => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasSubmittedWithErrors, setHasSubmittedWithErrors] = useState(false);

  const { push } = usePushRoute();
  const dispatch = useDispatch();

  return {
    login: async () => {
      setLoading(true);
      setHasSubmittedWithErrors(true);
      if (username.trim() !== '') {
        await dispatch(
          loginAction({
            password,
            username,
            onFailure: (errorText) => {
              dispatch(
                showToasterAction({
                  description: errorText,
                  type: toasterTypes.failure,
                }),
              );
              setLoading(false);
            },
            onSuccess: async () => {
              dispatch(
                showToasterAction({
                  description: translate('toasts.successfulLogin.text'),
                  type: toasterTypes.success,
                }),
              );

              await dispatch(userActions.getMy({}));
              await dispatch(projectsActions.getMy({}));
              await dispatch(stackComponentsActions.getTypes());
              // await push(routePaths.userEmail);
            },
          }),
        );
      }
    },
    hasSubmittedWithErrors,
    username,
    setUsername,
    password,
    setPassword,
    loading,
  };
};
