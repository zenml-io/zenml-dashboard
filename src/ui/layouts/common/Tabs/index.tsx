import React from 'react';
import { Link, matchPath, Redirect, Switch } from 'react-router-dom';
import { iconColors } from '../../../../constants';
import { AppRoute } from '../../../../routes';
import { joinClassNames } from '../../../../utils';
import {
  Box,
  FlexBox,
  If,
  Paragraph,
  Truncate,
  icons,
} from '../../../components';
import { useLocationPath } from '../../../hooks';

import styles from './index.module.scss';

// avoid refactoring call sites
type InternalTabPage = {
  internal: true;
  text: string;
  Component: React.FC;
  path: string;
  locked: boolean;
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
                    <icons.lock
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
                    <Box className={styles.link} style={{ cursor: 'default' }}>
                      {Text}
                    </Box>
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
          <FlexBox marginBottom="xxl">
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
