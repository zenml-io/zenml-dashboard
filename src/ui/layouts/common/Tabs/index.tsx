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
// Muhammad Ali Zia line: 42 43 44 , styles 
export const Tabs: React.FC<{ pages: TabPage[]; basePath: string }> = ({
  pages,
  basePath,
}) => {
  const locationPath = useLocationPath();
  console.log("__UNAUTH PAGES MAIN", pages)
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
                  <FlexBox.Row>

                    <Box
                      key={index}
                      paddingBottom="sm"
                      paddingHorizontal="md"
                      // marginHorizontal="md"
                      className={joinClassNames(
                        styles.item,
                        isActive ? styles.activeItem : '',
                      )}
                      // style={{transition: '0.25s ease-out'}}
                    >
                      {console.log("__UNAUTH PAGE PATH: ", page.path)}

                      <Link className={styles.link} to={page.path}>
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
                    {/* {index + 1 === pages.length ? "" :

                      <Box style={{ height: "100%", width: "1.5px", background: '#00000080' }}>
                      </Box>
                    } */}
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




export const TabsRuns: React.FC<{ pages: TabPage[]; basePath: string }> = ({
  pages,
  basePath,
}) => {
  const locationPath = useLocationPath();
  console.log("__UNAUTH PAGES MAIN", pages)
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
                      {console.log("__UNAUTH PAGE PATH: ", page.path)}

                      <Link className={styles.link} to={page.path}>
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

                      <Box style={{ height: "100%", width: "1.5px", background: '#00000080' }}>
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
