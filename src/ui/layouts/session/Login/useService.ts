import { useState } from 'react';
import { DEFAULT_PROJECT_NAME, toasterTypes } from '../../../../constants';
import {
  projectsActions,
  showToasterAction,
  stackComponentsActions,
  userActions,
} from '../../../../redux/actions';
import { loginAction } from '../../../../redux/actions/session/loginAction';
import { useDispatch, usePushRoute, useSelector } from '../../../hooks';
import { translate } from './translate';
import { projectSelectors } from '../../../../redux/selectors';
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
  const selectedProject = useSelector(projectSelectors.selectedProject);
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

              if (window.location.search.includes('projects')) {
                const projectFromUrl = window.location.search.split('/')[2];
                await dispatch(
                  projectsActions.getMy({
                    selectDefault: false,
                    selectedProject: projectFromUrl
                      ? projectFromUrl
                      : selectedProject,
                  }),
                );
              } else {
                await dispatch(
                  projectsActions.getMy({
                    selectDefault: false,
                    selectedProject: selectedProject
                      ? selectedProject
                      : DEFAULT_PROJECT_NAME,
                  }),
                );
              }

              await dispatch(userActions.getMy({}));
              await dispatch(stackComponentsActions.getTypes());
              if (window.location.pathname === '/') {
                push(routePaths.dashboard(DEFAULT_PROJECT_NAME));
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
