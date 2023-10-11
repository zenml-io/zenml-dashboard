import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { AppRoute } from '../../../routes';
import { Box, FlexBox, IfElse } from '../../components';
import { AuthenticatedLayout } from '../common/layouts/AuthenticatedLayout';
import { SidebarContainer } from '../common/layouts/SidebarContainer';
import { TabsRuns } from '../common/Tabs';
import Header from './Header';
import Connectors from './Connectors';
import { useSelector } from 'react-redux';
import { workspaceSelectors } from '../../../redux/selectors';
import { ErrorBoundary } from 'react-error-boundary';
import { MyFallbackComponent } from '../../components/FallbackComponent';
import { routePaths } from '../../../routes/routePaths';

export const BasePage: React.FC<{
  tabPages: TabPage[];
  singleTab?: boolean;
  title?: string;
  fromConfigureComponent?: boolean;
  fromRegisterComponent?: boolean;
  breadcrumbs: TBreadcrumb[];
  tabBasePath: string;
  renderHeaderRight?: () => JSX.Element;
  headerWithButtons?: boolean;
}> = ({
  tabPages,
  title,
  singleTab = false,
  breadcrumbs,
  tabBasePath,
  renderHeaderRight,
  headerWithButtons,
  children,
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

          <Box>
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
        </SidebarContainer>
      </AuthenticatedLayout>
    </ErrorBoundary>
  );
};

export default Connectors;
