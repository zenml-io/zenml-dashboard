import React from 'react';
import { Box, IfElse } from '../../components';
import { AuthenticatedLayout } from '../common/layouts/AuthenticatedLayout';
import { SidebarContainer } from '../common/layouts/SidebarContainer';
import { Tabs } from '../common/Tabs';
import Header from './Header';
import { useService } from './useService';

export const BasePage: React.FC<{
  tabPages: TabPage[];
  breadcrumbs: TBreadcrumb[];
  tabBasePath: string;
  renderHeaderRight?: () => JSX.Element;
  headerWithButtons?: boolean;
}> = ({ tabPages, breadcrumbs, tabBasePath, headerWithButtons, children }) => {
  // const { organization } = useService();

  // if (!organization) return null;

  // const organizationName = organization.name;

  return (
    <AuthenticatedLayout>
      <SidebarContainer>
        <IfElse
          condition={!!headerWithButtons}
          renderWhenTrue={() => (
            <Header.HeaderWithButtons breadcrumbs={[...breadcrumbs]} />
          )}
          renderWhenFalse={() => (
            <Header.DefaultHeader breadcrumbs={[...breadcrumbs]} />
          )}
        />

        <Box>
          {children}
          <Tabs pages={tabPages} basePath={tabBasePath} />
        </Box>
      </SidebarContainer>
    </AuthenticatedLayout>
  );
};

export default BasePage;
