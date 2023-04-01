import React from 'react';
import { Redirect } from 'react-router-dom';
import { AppRoute } from '../../../routes';
import { Box, FlexBox, IfElse } from '../../components';
import { AuthenticatedLayout } from '../common/layouts/AuthenticatedLayout';
import { SidebarContainer } from '../common/layouts/SidebarContainer';
import { Tabs, TabsRuns } from '../common/Tabs';
import Header from './Header';
import Pipelines from './Pipelines';

export const BasePage: React.FC<{
  tabPages: TabPage[];
  title?: string;
  breadcrumbs: TBreadcrumb[];
  tabBasePath: string;
  renderHeaderRight?: () => JSX.Element;
  headerWithButtons?: boolean;
}> = ({
  tabPages,
  breadcrumbs,
  tabBasePath,
  title,
  renderHeaderRight,
  headerWithButtons,
  children,
}) => {
  return (
    <AuthenticatedLayout breadcrumb={[...breadcrumbs]}>
      <SidebarContainer>
        {console.log(breadcrumbs, '')}
        <IfElse
          condition={!!headerWithButtons}
          renderWhenTrue={() => (
            <Header.HeaderWithButtons
              title={title}
              breadcrumbs={[...breadcrumbs]}
              renderRight={renderHeaderRight}
            />
          )}
          renderWhenFalse={() => (
            <Header.DefaultHeader
              breadcrumbs={[...breadcrumbs]}
              renderRight={renderHeaderRight}
            />
          )}
        />

        <Box>
          {children}
          {tabPages.length > 1 ? (
            // <Tabs pages={tabPages} basePath={tabBasePath} />
          <TabsRuns pages={tabPages} basePath={tabBasePath} />

          ) : (
            <>
              <FlexBox marginTop="xxl" marginBottom="sm"></FlexBox>
              <FlexBox marginBottom="xxl">
                {/* <Switch> */}
                {console.log(tabPages, 'tabPages')}
                <Redirect exact from={tabBasePath} to={tabPages[0].path} />

                {tabPages.map((page, index) => (
                  <AppRoute
                    key={index}
                    path={page.path}
                    exact={true}
                    component={page.Component}
                  />
                ))}
                {/* </Switch> */}
              </FlexBox>
            </>
          )}
        </Box>
      </SidebarContainer>
    </AuthenticatedLayout>
  );
};

export default Pipelines;
