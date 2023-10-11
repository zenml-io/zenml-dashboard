import React, { useEffect, useState } from 'react';

import {
  H2,
  Container,
  FlexBox,
  Box,
  Image,
  EaseInBox,
  FullWidthSpinner,
} from '../../../components';

import { Form } from './Form';

import styles from './index.module.scss';

import image from '../imageNew.png';
import { translate } from './translate';
import { routePaths } from '../../../../routes/routePaths';
import { Link } from 'react-router-dom';
import { useDispatch, usePushRoute, useSelector } from '../../../hooks';

import { loginAction } from '../../../../redux/actions/session/loginAction';
import {
  workspacesActions,
  showToasterAction,
  stackComponentsActions,
  userActions,
  serverInfoActions,
} from '../../../../redux/actions';
import { DEFAULT_WORKSPACE_NAME, toasterTypes } from '../../../../constants';
import {
  serverInfoSelectors,
  workspaceSelectors,
} from '../../../../redux/selectors';
import { OauthHandler } from './OauthHandler';
const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const password = process.env.REACT_APP_PASSWORD;
  const username = process.env.REACT_APP_USERNAME;
  const authScheme = useSelector(serverInfoSelectors.getAuthScheme);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const { push } = usePushRoute();

  const login = async () => {
    setLoading(true);

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
          setLoading(false);

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
                selectedWorkspace,
              }),
            );
          }

          await dispatch(userActions.getMy({}));
          await dispatch(stackComponentsActions.getTypes());
          if (window.location.pathname === '/') {
            push(routePaths.dashboard(DEFAULT_WORKSPACE_NAME));
          }
        },
      }),
    );
  };

  useEffect(() => {
    dispatch(serverInfoActions.getServerInfo({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (process.env.REACT_APP_DEMO_SETUP === 'true') {
      setLoading(true);
      login();
    }
    return () => {
      setLoading(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <FullWidthSpinner color="black" size="md" />;
  }

  return (
    <EaseInBox>
      <Container
        className={styles.login}
        style={{ height: window.innerHeight }}
        fluid
      >
        <Box style={{ overflowY: 'auto', maxHeight: '100vh' }}>
          <Box margin="xxl" style={{ textAlign: 'center' }}>
            <Link to={routePaths.login}>
              <Image src={image} />
            </Link>
          </Box>
          <FlexBox.Column
            paddingHorizontal="sm"
            justifyContent="center"
            className={styles.loginBox}
          >
            <Box marginTop="xl" style={{ textAlign: 'center' }}>
              <Box paddingBottom="md">
                <H2 bold color="white">
                  {translate('title')}
                </H2>
              </Box>
            </Box>
            {authScheme === 'EXTERNAL' ? <OauthHandler /> : <Form />}
          </FlexBox.Column>
        </Box>
      </Container>
    </EaseInBox>
  );
};

export default Login;
