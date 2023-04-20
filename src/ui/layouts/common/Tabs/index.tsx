import React from 'react';
import { Link, matchPath, Redirect, Switch } from 'react-router-dom';
import { iconColors } from '../../../../constants';
import { AppRoute } from '../../../../routes';
import { joinClassNames } from '../../../../utils';
import {
  Box,
  FlexBox,
  If,
  IfElse,
  LinkBox,
  Paragraph,
  Truncate,
  icons,
} from '../../../components';
import { useLocationPath, useToaster } from '../../../hooks';

import styles from './index.module.scss';

// avoid refactoring call sites
type InternalTabPage = {
  internal: true;
  text: string;
  Component: React.FC;
  path: string;
  locked: boolean;
  lockedClickHandler: () => void;
};

type ExternalTabPage = {
  internal: false;
  text: string;
  externalPath: string;
};
type ProcessedTabPage = InternalTabPage | ExternalTabPage;

export const Tabs: React.FC<{ pages: TabPage[]; basePath: string }> = ({
  pages: plainPages,
  basePath,
}) => {
  const locationPath = useLocationPath();
  const { failureToast } = useToaster();

  const pages = plainPages.map(
    (p): ProcessedTabPage => {
      if ('externalPath' in p && p.externalPath) {
        return {
          internal: false,
          text: p.text,
          externalPath: p.externalPath,
        };
      }

      return {
        internal: true,
        text: p.text,
        Component: p.Component,
        path: p.path,
        locked: !!p.locked,
        lockedClickHandler:
          p.lockedClickHandler ??
          (() => failureToast({ description: 'This tab is locked.' })),
      };
    },
  );
  const isInternal = (p: ProcessedTabPage): p is InternalTabPage => p.internal;
  const firstInternalPage = pages.filter(isInternal)[0];

  return (
    <If condition={pages.length > 0}>
      {() => (
        <>
          <FlexBox
            marginTop="xxl"
            marginBottom="sm"
            className={styles.navigation}
          >
            {pages.map((page, index) => {
              const isActive =
                page.internal &&
                !!matchPath(locationPath, {
                  path: page?.path,
                  exact: true,
                });

              const Text = (
                <FlexBox alignItems="start">
                  {page.internal && page.locked && (
                    <icons.lock2
                      color={iconColors.grey}
                      size="sml"
                      style={{ marginRight: '6px' }}
                    />
                  )}

                  <Truncate maxLines={1}>
                    <Paragraph color={isActive ? 'primary' : 'grey'}>
                      {page.text}
                    </Paragraph>
                  </Truncate>

                  {!page.internal && (
                    <icons.arrowSquareOut
                      color={isActive ? iconColors.primary : iconColors.grey}
                      size="sml"
                      style={{ marginLeft: '6px' }}
                    />
                  )}
                </FlexBox>
              );

              return (
                <Box
                  key={index}
                  paddingBottom="sm"
                  paddingHorizontal="md"
                  className={joinClassNames(
                    styles.item,
                    isActive ? styles.activeItem : '',
                  )}
                >
                  {page.internal && page.locked ? (
                    <LinkBox
                      className={styles.link}
                      onClick={page.lockedClickHandler}
                    >
                      {Text}
                    </LinkBox>
                  ) : page.internal ? (
                    <Link className={styles.link} to={page.path}>
                      {Text}
                    </Link>
                  ) : (
                    <a
                      className={styles.link}
                      href={page.externalPath}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {Text}
                    </a>
                  )}
                </Box>
              );
            })}
          </FlexBox>
          <FlexBox marginBottom="xxl" fullHeight>
            <Switch>
              <Redirect exact from={basePath} to={firstInternalPage.path} />

              {pages.map(
                (page, index) =>
                  page.internal && (
                    <AppRoute
                      key={index}
                      path={page.path}
                      exact={true}
                      component={page.Component}
                    />
                  ),
              )}
            </Switch>
          </FlexBox>
        </>
      )}
    </If>
  );
};

export const TabsRuns: React.FC<{ pages: TabPage[]; basePath: string }> = ({
  pages,
  basePath,
}) => {
  const locationPath = useLocationPath();
  return (
    <>
      <If condition={pages.length > 0}>
        {() => (
          <>
            <FlexBox
              marginTop="xxl"
              marginBottom="sm"
              className={styles.navigationRuns}
            >
              {pages.map((page, index) => {
                const isActive = !!matchPath(locationPath, {
                  path: page.path,
                  exact: true,
                });

                return (
                  <FlexBox.Row>

                    <Box
                      key={index}
                      // paddingBottom="sm"
                      // paddingHorizontal="md"
                      marginHorizontal="lg"
                      className={joinClassNames(
                        styles.item,
                        isActive ? styles.activeItem : '',
                      )}
                      // style={{transition: '0.25s ease-out'}}
                    >

                      <Link className={styles.linkRuns} to={page.path}>
                        <IfElse
                          condition={isActive}
                          renderWhenFalse={() => (
                            <Truncate maxLines={1}>
                              <Paragraph style={{color:'#443E9950', transition: '0.25s ease-out'}}>{page.text}</Paragraph>
                            </Truncate>
                          )}
                          renderWhenTrue={() => (
                            <Truncate maxLines={1}>
                              <Paragraph color="primary">{page.text}</Paragraph>
                            </Truncate>
                          )}
                        />
                      </Link>
                    </Box>
                    {index + 1 === pages.length ? "" :

                      <Box style={{ height: "100%", width: "2px", background: '#00000040', marginLeft:'20px', marginRight:'20px' }}>
                      </Box>
                    }
                  </FlexBox.Row>
                );
              })}
            </FlexBox>
            <FlexBox marginBottom="xxl">
              <Switch>
                <Redirect exact from={basePath} to={pages[0].path} />

                {pages.map((page, index) => (
                  <AppRoute
                    key={index}
                    path={page.path}
                    exact={true}
                    component={page.Component}
                  />
                ))}
              </Switch>
            </FlexBox>
          </>
        )}
      </If>
    </>
  );
};
