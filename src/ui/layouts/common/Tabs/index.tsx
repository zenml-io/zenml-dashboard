import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { AppRoute } from '../../../../routes';
import {
  FlexBox,
  If,
} from '../../../components';

export const Tabs: React.FC<{ pages: TabPage[]; basePath: string }> = ({
  pages,
  basePath,
}) => {
  return (
    <>
      <If condition={pages.length > 0}>
        {() => (
            <FlexBox marginTop="xl">
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
        )}
      </If>
    </>
  );
};
