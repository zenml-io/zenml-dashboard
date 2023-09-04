import React from 'react';
import { Box, IfElse } from '../../components';
import { AuthenticatedLayout } from '../common/layouts/AuthenticatedLayout';
import { SidebarContainer } from '../common/layouts/SidebarContainer';
import { TabsRuns } from '../common/Tabs';
import Header from './Header';
import Stacks from './Stacks';
import { useHistory } from 'react-router';
import { useSelector } from '../../hooks';
import { workspaceSelectors } from '../../../redux/selectors';
import { MyFallbackComponent } from '../../components/FallbackComponent';
import { routePaths } from '../../../routes/routePaths';
import { ErrorBoundary } from 'react-error-boundary';
// Muhammad REACT FLOW BOX HERE
export const BasePage: React.FC<{
  tabPages: TabPage[];
  breadcrumbs: TBreadcrumb[];
  tabBasePath: string;
  renderHeaderRight?: () => JSX.Element;
  headerWithButtons?: boolean;
}> = ({
  tabPages,
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
            <TabsRuns pages={tabPages} basePath={tabBasePath} />
          </Box>
        </SidebarContainer>
      </AuthenticatedLayout>
    </ErrorBoundary>
  );
};

export default Stacks;
