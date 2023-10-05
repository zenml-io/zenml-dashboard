import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { AppRoute } from '../../../routes';
import { Box, FlexBox, IfElse } from '../../components';
import { AuthenticatedLayout } from '../common/layouts/AuthenticatedLayout';
import { SidebarContainer } from '../common/layouts/SidebarContainer';
import { Tabs, TabsRuns } from '../common/Tabs';
import Header from './Header';
import Stacks from './Stacks';
import Component from './Component';
import { useSelector } from '../../hooks';
import { workspaceSelectors } from '../../../redux/selectors';
import { MyFallbackComponent } from '../../components/FallbackComponent';
import { ErrorBoundary } from 'react-error-boundary';
import { routePaths } from '../../../routes/routePaths';

export const BasePage: React.FC<{
  tabPages: TabPage[];
  fromConfigureComponent?: boolean;
  fromRegisterComponent?: boolean;
  breadcrumbs: TBreadcrumb[];
  tabBasePath: string;
  title?: string;
  singleTab?: boolean;
  renderHeaderRight?: () => JSX.Element;
  headerWithButtons?: boolean;
}> = ({
  fromRegisterComponent = false,
  fromConfigureComponent = false,
  tabPages,
  breadcrumbs,
  singleTab = false,
  tabBasePath,
  renderHeaderRight,
  headerWithButtons,
  children,
  title,
}) => {
  const history = useHistory();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  return (
    <ErrorBoundary
      FallbackComponent={MyFallbackComponent}
      onReset={() => {
        history.push(routePaths.dashboard(selectedWorkspace));
      }}
    >
      <AuthenticatedLayout breadcrumb={[...breadcrumbs]}>
        <SidebarContainer>
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
          <FlexBox.Row
            justifyContent="space-between"
            style={{ marginTop: '-20px' }}
          >
            {!fromConfigureComponent && (
              <Component fromRegisterComponent={fromRegisterComponent} />
            )}

            <Box
              marginLeft="lg"
              style={{ width: !fromConfigureComponent ? '80%' : '100%' }}
            >
              {children}
              {tabPages.length > 1 ? (
                <TabsRuns pages={tabPages} basePath={tabBasePath} />
              ) : (
                <>
                  <FlexBox marginTop="xxl" marginBottom="sm"></FlexBox>
                  <FlexBox marginBottom="xxl">
                    <Redirect exact from={tabBasePath} to={tabPages[0].path} />

                    {tabPages.map((page, index) => (
                      <AppRoute
                        key={index}
                        path={page.path}
                        exact={true}
                        component={page.Component}
                      />
                    ))}
                  </FlexBox>
                </>
              )}
            </Box>
          </FlexBox.Row>
        </SidebarContainer>
      </AuthenticatedLayout>
    </ErrorBoundary>
  );
};

export default Stacks;
