import React from 'react';
import { Box, Paragraph } from '../../components';
import { AuthenticatedLayout } from '../common/layouts/AuthenticatedLayout';
import { SidebarContainer } from '../common/layouts/SidebarContainer';
import { Tabs } from '../common/Tabs';

import { getTranslateByScope } from '../../../services';
import { routePaths } from '../../../routes/routePaths';
import { PersonalDetails } from './PersonalDetails';
import { Organization } from './Organization';

export const translate = getTranslateByScope('ui.layouts.Settings');

const PAGES = [
  {
    text: translate('tabs.personalDetails.text'),
    Component: PersonalDetails,
    path: routePaths.settings.personalDetails,
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
          <Paragraph>{translate('title')}</Paragraph>
        </Box>
        <Box>
          <Tabs pages={PAGES} basePath={routePaths.settings.base} />
        </Box>
      </SidebarContainer>
    </AuthenticatedLayout>
  );
};

export default SettingsPage;
