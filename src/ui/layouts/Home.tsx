/* eslint-disable */

import React from 'react';
import { AuthenticatedLayout } from './common/layouts/AuthenticatedLayout';

import { SidebarContainer } from './common/layouts/SidebarContainer';
import {
  Box,
  Col,
  EaseInBox,
  FlexBox,
  H2,
  H4,
  Row,
  ColoredCircle,
  icons,
  GhostButton,
  Image,
  LayoutFlow,
} from '../components';
import { getTranslateByScope } from '../../services';

import styles from './Home.module.scss';
import { iconColors } from '../../constants';
import { usePushRoute } from '../hooks';
import image from './home-image.png';

export const translate = getTranslateByScope('ui.layouts.Dashboard');

const GreyBoxWithIcon: React.FC<{
  title: string;
  buttonText: string;
  IconComponent: React.ReactNode;
  onClick: () => void;
}> = ({ title, buttonText, IconComponent, onClick }) => {
  return (
    <FlexBox.Row
      marginVertical="md"
      className={styles.greyBoxWithIcon}
      padding="md"
      alignItems="center"
      justifyContent="space-between"
    >
      <FlexBox.Row alignItems="center">
        <Box marginRight="md">
          <ColoredCircle color="primary" size="lg">
            {IconComponent}
          </ColoredCircle>
        </Box>
        <H4 bold>{title}</H4>
      </FlexBox.Row>
      <Box>
        <GhostButton onClick={onClick}>{buttonText}</GhostButton>
      </Box>
    </FlexBox.Row>
  );
};

export const Home: React.FC = () => {
  const { push } = usePushRoute();

  return (
    <AuthenticatedLayout>
      <LayoutFlow />
      {/* <SidebarContainer>
        <EaseInBox>
          <Box marginTop="5xl">
            <Row style={{ alignItems: 'center' }}>
              <Col xs={12} lg={7}>
                <Box paddingBottom="md">
                  <H2 bold>{translate('title')}</H2>
                </Box>
                <Box paddingBottom="xxxl">
                  <H4 bold>{translate('subtitle')}</H4>
                </Box>
                <GreyBoxWithIcon
                  onClick={() =>
                    window.open(translate('cardOne.button.href'), '_blank')
                  }
                  IconComponent={<icons.bookOpen color={iconColors.white} />}
                  title={translate('cardOne.title')}
                  buttonText={translate('cardOne.button.text')}
                />
                <GreyBoxWithIcon
                  onClick={() => window.open(translate('cardTwo.button.href'), '_blank')}
                  IconComponent={<icons.tool color={iconColors.white} />}
                  title={translate('cardTwo.title')}
                  buttonText={translate('cardTwo.button.text')}
                />
                <GreyBoxWithIcon
                  onClick={() => window.open(translate('cardThree.button.href'), '_blank')}
                  IconComponent={<icons.userPlus color={iconColors.white} />}
                  title={translate('cardThree.title')}
                  buttonText={translate('cardThree.button.text')}
                />
              </Col>
              <Col xs={12} lg={5} style={{ paddingRight: 0 }}>
                <Box>
                  <Image style={{ maxWidth: '100%' }} src={image} />
                </Box>
              </Col>
            </Row>
          </Box>
        </EaseInBox>
      </SidebarContainer> */}
    </AuthenticatedLayout>
  );
};

export default Home;