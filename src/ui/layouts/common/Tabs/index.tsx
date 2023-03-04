import React from 'react';
import { Link, matchPath, Redirect, Switch } from 'react-router-dom';
import { AppRoute } from '../../../../routes';
import { joinClassNames } from '../../../../utils';
import {
  Box,
  FlexBox,
  If,
  IfElse,
  Paragraph,
  Truncate,
} from '../../../components';
import { useLocationPath } from '../../../hooks';

import styles from './index.module.scss';

export const Tabs: React.FC<{ pages: TabPage[]; basePath: string }> = ({
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
              className={styles.navigation}
            >
              {pages.map((page, index) => {
                const isActive = !!matchPath(locationPath, {
                  path: page.path,
                  exact: true,
                });

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
                    <Link className={styles.link} to={page.path}>
                      <IfElse
                        condition={isActive}
                        renderWhenFalse={() => (
                          <Truncate maxLines={1}>
                            <Paragraph color="grey">{page.text}</Paragraph>
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
