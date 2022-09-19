import React from 'react';

import {
  H2,
  Paragraph,
  Container,
  FlexBox,
  Box,
  Image,
  EaseInBox,
} from '../../../components';

import { Form } from './Form';

import styles from './index.module.scss';

import image from '../imageNew.png';
import { translate } from './translate';
import { routePaths } from '../../../../routes/routePaths';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <EaseInBox>
      <Container className={styles.login} style={{ height: window.innerHeight }} fluid>
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
                    <H2 bold color='white'>{translate('title')}</H2>
                  </Box>
                  <Paragraph style={{ color: "#A1A4AB" }}>{translate('subtitle')}</Paragraph>
                </Box>
                <Form />
              </FlexBox.Column>
            </Box>
      </Container>
    </EaseInBox>
  );
};

export default Login;
