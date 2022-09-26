/* eslint-disable */

import React, { useState } from 'react';
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
  Paragraph,
} from '../components';
import { getTranslateByScope } from '../../services';

import styles from './Home.module.scss';
import { iconColors } from '../../constants';
import { usePushRoute } from '../hooks';
 
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
        <GhostButton style={{ width: '124px' }} onClick={onClick}>{buttonText}</GhostButton>
      </Box>
    </FlexBox.Row>
  );
};

export const Home: React.FC = () => {
  const { push } = usePushRoute();

  const [box, setBox] = useState('')

  const dashData = [
    { number: 204, text: 'Number of Users' },
    { number: 124, text: 'Number of Stacks' },
    { number: 245, text: 'Number of Components' },
    { number: 434, text: 'Number of Pipelines' }
  ]  

  return (
    <AuthenticatedLayout>
      <SidebarContainer>
        <EaseInBox>
          <Box marginTop="5xl" marginLeft='xl' >
            <Row style={{ alignItems: 'center' }}>
              <Col xs={12} lg={10}>
                <Box paddingBottom="md">
                  <H2 bold>{translate('title')}</H2>
                </Box>
                <Box paddingBottom="lg">
                  <H4 bold>{translate('subtitle')}</H4>
                </Box>
      
                <FlexBox>
                  {dashData.map((e) => (
                    <Box marginRight="xxl" style={{ width: '220px', minHeight: '100px', border: '1px solid #C9CBD0', borderRadius: '6px', padding: '13px 14px', backgroundColor: box === e.text ? '#431D93' : '#fff' }} onClick={() => setBox(e.text)} >
                      <Paragraph style={{ fontSize: '24px', fontWeight: "bold", color: box === e.text ? '#fff' : '#431D93' }}>{e.number}</Paragraph>
                      <Paragraph style={{ fontSize: '14px', fontWeight: "inherit", color:  box === e.text ? '#fff' : '#646972', marginTop: '38px' }}>{e.text}</Paragraph>
                    </Box>
                  ))}
                </FlexBox>
              </Col>
              
              <Col xs={12} lg={7}>
                <Box marginTop="xxxl" >                
                  <GreyBoxWithIcon
                    onClick={() =>
                      window.open(translate('cardOne.button.href'), '_blank')
                    }
                    IconComponent={<icons.bookOpen color={iconColors.white} />}
                    title={translate('cardOne.title')}
                    buttonText={translate('cardOne.button.text')}
                  />
                  <GreyBoxWithIcon
                    onClick={() => push('/settings/personal-details')}
                    IconComponent={<icons.tool color={iconColors.white} />}
                    title={translate('cardTwo.title')}
                    buttonText={translate('cardTwo.button.text')}
                  />
                  <GreyBoxWithIcon
                    onClick={() => push('/settings/organization')}
                    IconComponent={<icons.userPlus color={iconColors.white} />}
                    title={translate('cardThree.title')}
                    buttonText={translate('cardThree.button.text')}
                  />
                </Box>
              </Col>
            </Row>
          </Box>
        </EaseInBox>
      </SidebarContainer>
    </AuthenticatedLayout>
  );
};

export default Home;
