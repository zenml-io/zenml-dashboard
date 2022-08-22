import React from 'react';
import { Box, H2 } from '../../components';
import { AuthenticatedLayout } from '../common/layouts/AuthenticatedLayout';
import { SidebarContainer } from '../common/layouts/SidebarContainer';
import { Tabs } from '../common/Tabs';

import { getTranslateByScope } from '../../../services';
import { routePaths } from '../../../routes/routePaths';
import { PersonalDetails } from './PersonalDetails';
import { Plan } from './Plan';
import { Organization } from './Organization';
import { Billing } from './Billing';

export const translate = getTranslateByScope('ui.layouts.Settings');

const PAGES = [
  {
    text: translate('tabs.personalDetails.text'),
    Component: PersonalDetails,
    path: routePaths.settings.personalDetails,
  },
  {
    text: translate('tabs.yourPlan.text'),
    Component: Plan,
    path: routePaths.settings.yourPlan,
  },
  {
    text: translate('tabs.billing.text'),
    Component: Billing,
    path: routePaths.settings.billing,
  },
  {
    text: translate('tabs.organizationSettings.text'),
    Component: Organization,
    path: routePaths.settings.organizationSettings,
  },
];

export const SettingsPage: React.FC = () => {
  return (
    <AuthenticatedLayout>
      <SidebarContainer>
        <Box marginTop="xl">
          <H2 bold>{translate('title')}</H2>
        </Box>
        <Box>
          <Tabs pages={PAGES} basePath={routePaths.settings.base} />
        </Box>
      </SidebarContainer>
    </AuthenticatedLayout>
  );
};

export default SettingsPage;
