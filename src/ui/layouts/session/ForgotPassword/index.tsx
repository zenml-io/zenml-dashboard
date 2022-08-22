import React from 'react';

import {
  H2,
  Paragraph,
  Container,
  Row,
  Col,
  FlexBox,
  Box,
  MaiotLogo,
  SecondaryLink,
  Image,
  EaseInBox,
} from '../../../components';

import { Form } from './Form';

import styles from './index.module.scss';

import image from '../image.png';
import { translate } from './translate';
import { routePaths } from '../../../../routes/routePaths';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  return (
    <EaseInBox>
      <Container style={{ overflow: 'hidden' }} fluid>
        <Row>
          <Col md={5}>
            <Box style={{ overflowY: 'auto', maxHeight: '100vh' }}>
              <Box margin="xxl">
                <Link to={routePaths.signup}>
                  <MaiotLogo />
                </Link>
              </Box>
              <FlexBox.Column
                paddingHorizontal="sm"
                justifyContent="center"
                className={styles.loginBox}
              >
                <Box marginTop="xl">
                  <Box paddingBottom="md">
                    <H2 bold>{translate('title')}</H2>
                  </Box>
                  <Paragraph color="grey">{translate('subtitle')}</Paragraph>
                  <Form />
                </Box>
                <FlexBox marginBottom="xxl" marginTop="xl">
                  <Paragraph size="small">{translate('login.text')}</Paragraph>
                  <Box paddingLeft="xs">
                    <SecondaryLink
                      size="small"
                      text={translate('login.link')}
                      route={routePaths.login}
                    />
                  </Box>
                </FlexBox>
              </FlexBox.Column>
            </Box>
          </Col>
          <Col md={7} className="d-none d-md-block">
            <FlexBox
              justifyContent="center"
              alignItems="center"
              className={styles.background}
            >
              <Box>
                <Image className={styles.backgroundImage} src={image} />
              </Box>
            </FlexBox>
          </Col>
        </Row>
      </Container>
    </EaseInBox>
  );
};

export default ForgotPassword;
