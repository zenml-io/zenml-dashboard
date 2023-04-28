import React from 'react';

import {
  H2,
  Paragraph,
  Container,
  FlexBox,
  Box,
  EaseInBox,
  Image,
} from '../../../components';

import { Form } from './Form';

import styles from './index.module.scss';
import image from '../imageNew.png';

import { translate } from './translate';
import { routePaths } from '../../../../routes/routePaths';
import { Link } from 'react-router-dom';

const Signup: React.FC = () => {
  return (
    <EaseInBox>
      <Container className={styles.signUp} fluid>
        <Box style={{ overflowY: 'auto' }}>
          <Box margin="xxl" style={{ textAlign: 'center' }}>
            <Link to={routePaths.signup}>
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
              <Paragraph color="grey">{translate('subtitle')}</Paragraph>
            </Box>
            <Form />
          </FlexBox.Column>
        </Box>
      </Container>
    </EaseInBox>
  );
};

export default Signup;
