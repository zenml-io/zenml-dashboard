import React, { useEffect, useState } from 'react';

import {
  H2,
  Paragraph,
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
import { useDispatch, usePushRoute } from '../../../hooks';

import { loginAction } from '../../../../redux/actions/session/loginAction';
import { showToasterAction, userActions } from '../../../../redux/actions';
import { toasterTypes } from '../../../../constants';
const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const password = process.env.REACT_APP_PASSWORD;
  const username = process.env.REACT_APP_USERNAME;
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

          await dispatch(userActions.getMy({}));
          await push(routePaths.userEmail);
        },
      }),
    );
  };
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
              <Paragraph style={{ color: '#A1A4AB' }}>
                {translate('subtitle')}
              </Paragraph>
            </Box>
            <Form />
          </FlexBox.Column>
        </Box>
      </Container>
    </EaseInBox>
  );
};

export default Login;
