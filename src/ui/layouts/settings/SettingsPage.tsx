import React from 'react';
import { Box, Paragraph } from '../../components';
import { AuthenticatedLayout } from '../common/layouts/AuthenticatedLayout';
import { SidebarContainer } from '../common/layouts/SidebarContainer';
import { Tabs } from '../common/Tabs';

import { getTranslateByScope } from '../../../services';
import { routePaths } from '../../../routes/routePaths';
import { PersonalDetails } from './PersonalDetails';
import { Organization } from './Organization';
import { Starred } from './Starred';
import { Plugins } from './Plugins';

export const translate = getTranslateByScope('ui.layouts.Settings');

// TODO:
const hubIsConnected = false;

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
  {
    text: translate('tabs.starred.text'),
    Component: Starred,
    path: routePaths.settings.starredPlugins,
    locked: !hubIsConnected,
  },
  {
    text: translate('tabs.plugins.text'),
    Component: Plugins,
    path: routePaths.settings.myPlugins,
    locked: !hubIsConnected,
  },
];

export const SettingsPage: React.FC = () => {
  return (
    <AuthenticatedLayout>
      <SidebarContainer>
        <Box marginTop="xl" marginLeft="md" marginBottom="md">
          <Paragraph
            style={{ fontSize: '42px', fontWeight: 'bold', lineHeight: '48px' }}
          >
            {translate('title')}
          </Paragraph>
        </Box>
        <Box>
          <Tabs pages={PAGES} basePath={routePaths.settings.base} />
        </Box>
      </SidebarContainer>
    </AuthenticatedLayout>
  );
};

export default SettingsPage;
