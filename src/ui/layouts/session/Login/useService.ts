import { useState } from 'react';
import { DEFAULT_WORKSPACE_NAME, toasterTypes } from '../../../../constants';
import {
  workspacesActions,
  showToasterAction,
  stackComponentsActions,
  userActions,
} from '../../../../redux/actions';
import { loginAction } from '../../../../redux/actions/session/loginAction';
import { useDispatch, usePushRoute, useSelector } from '../../../hooks';
import { translate } from './translate';
import { workspaceSelectors } from '../../../../redux/selectors';
import { routePaths } from '../../../../routes/routePaths';
// import { routePaths } from '../../../../routes/routePaths';

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
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasSubmittedWithErrors, setHasSubmittedWithErrors] = useState(false);
  // const locationPath = useLocationPath();
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

              if (window.location.search.includes('workspaces')) {
                const workspaceFromUrl = window.location.search.split('/')[2];
                await dispatch(
                  workspacesActions.getMy({
                    selectDefault: false,
                    selectedWorkspace: workspaceFromUrl
                      ? workspaceFromUrl
                      : selectedWorkspace,
                  }),
                );
              } else {
                await dispatch(
                  workspacesActions.getMy({
                    selectDefault: false,
                    selectedWorkspace: selectedWorkspace
                      ? selectedWorkspace
                      : DEFAULT_WORKSPACE_NAME,
                  }),
                );
              }

              await dispatch(userActions.getMy({}));
              await dispatch(stackComponentsActions.getTypes());
              if (window.location.pathname === '/') {
                push(routePaths.dashboard(DEFAULT_WORKSPACE_NAME));
              }
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
