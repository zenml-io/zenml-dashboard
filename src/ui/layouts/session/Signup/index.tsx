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
  EaseInBox,
  icons,
  ExternalSecondaryLink,
} from '../../../components';

import { Form } from './Form';

import styles from './index.module.scss';

import { translate } from './translate';
import { routePaths } from '../../../../routes/routePaths';
import { Link } from 'react-router-dom';
import { iconColors } from '../../../../constants/icons';

const BulletPointText: React.FC<{ text: string }> = ({ text }) => (
  <FlexBox.Row alignItems="center">
    <icons.plus color={iconColors.primary} />
    <Box paddingLeft="sm">
      <Paragraph color="grey">{text}</Paragraph>
    </Box>
  </FlexBox.Row>
);

const Signup: React.FC = () => {
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
              className={styles.descriptionBox}
            >
              <Box className={styles.descriptionTextBox} paddingHorizontal="xl">
                <Box paddingBottom="md">
                  <H2 color="grey">Welcome to ZenML</H2>
                </Box>
                <Paragraph color="grey">
                  You're only seconds away from collaborating on reproducible,
                  production-ready Machine Learning pipelines.
                </Paragraph>
                <Box paddingTop="lg">
                  <BulletPointText text="Unlimited users" />
                  <BulletPointText text="Fully managed orchestration and scaling" />
                  <BulletPointText text="Built-in caching for intermediate pipeline steps" />
                  <BulletPointText text="Full experiment tracking" />
                </Box>
                <Box paddingTop="lg">
                  <ExternalSecondaryLink
                    size="small"
                    text="Learn more in our docs."
                    href="https://docs.maiot.io"
                  />
                </Box>
              </Box>
            </FlexBox>
          </Col>
        </Row>
      </Container>
    </EaseInBox>
  );
};

export default Signup;
