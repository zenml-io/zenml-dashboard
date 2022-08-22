import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import {
  Col,
  Row,
  H2,
  Box,
  Paragraph,
  PrimaryButton,
  FlexBox,
  If,
  IfElse,
  LinkBox,
  EaseInBox,
} from '../../../components';
import { AuthenticatedLayout } from '../layouts/AuthenticatedLayout';
import { SidebarContainer } from '../layouts/SidebarContainer';

import styles from './index.module.scss';

interface ButtonInterface {
  text: string;
  href: string;
}

interface TabInterface {
  title: string;
  Component: React.FC;
}

interface EmptyStagePageInterface {
  title: string;
  paragraph: string;
  button: ButtonInterface;
  tabs: TabInterface[] | null;
}

export const EmptyStagePage: React.FC<EmptyStagePageInterface> = ({
  title,
  paragraph,
  button,
  tabs,
}) => {
  const [activeTab, setActiveTab] = useState<TabInterface | null>(null);

  useEffect(() => {
    if (tabs != null && tabs.length > 0) {
      setActiveTab(tabs[0]);
    }
  }, []);

  return (
    <AuthenticatedLayout>
      <SidebarContainer>
        <EaseInBox>
          <Box marginTop="5xl">
            <Row style={{ alignItems: 'center' }}>
              <Col xs={12} lg={6}>
                <Box paddingVertical="lg" paddingHorizontal="md">
                  <Box paddingBottom="xl">
                    <H2 bold>{title}</H2>
                  </Box>
                  <Box paddingBottom="xl">
                    <Paragraph className={styles.paragraph} color="darkGrey">
                      {paragraph}
                    </Paragraph>
                  </Box>
                  <Box>
                    <PrimaryButton
                      onClick={() => window.open(button.href, '_blank')}
                    >
                      {button.text}
                    </PrimaryButton>
                  </Box>
                </Box>
              </Col>
              {tabs != null && (
                <Col xs={12} lg={6}>
                  <Box paddingVertical="lg" paddingHorizontal="md">
                    <FlexBox className={styles.tabLinksWrapper}>
                      {tabs.map((tab: TabInterface, index: number) => (
                        <LinkBox
                          className={cn(
                            styles.tabLink,
                            !!activeTab &&
                              activeTab === tab &&
                              styles.activeTabLink,
                          )}
                          onClick={() => setActiveTab(tab)}
                          key={index}
                        >
                          <Box paddingHorizontal="md" paddingVertical="sm">
                            <IfElse
                              condition={!!activeTab && activeTab === tab}
                              renderWhenTrue={() => (
                                <Paragraph color="black">{tab.title}</Paragraph>
                              )}
                              renderWhenFalse={() => (
                                <Paragraph color="darkGrey">
                                  {tab.title}
                                </Paragraph>
                              )}
                            />
                          </Box>
                        </LinkBox>
                      ))}
                    </FlexBox>
                    <If condition={!!activeTab}>
                      {() => (
                        <Box
                          paddingHorizontal="lg"
                          paddingVertical="md"
                          className={styles.tabContent}
                        >
                          {activeTab && <activeTab.Component />}
                        </Box>
                      )}
                    </If>
                  </Box>
                </Col>
              )}
            </Row>
          </Box>
        </EaseInBox>
      </SidebarContainer>
    </AuthenticatedLayout>
  );
};
