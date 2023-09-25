import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { useHubToken } from '../../hooks/auth';
import { hubConnectionPromptActionTypes } from '../../../redux/actionTypes';
import { useHistory } from 'react-router';
import { workspaceSelectors } from '../../../redux/selectors';
import { ErrorBoundary } from 'react-error-boundary';
import { MyFallbackComponent } from '../../components/FallbackComponent';

export const translate = getTranslateByScope('ui.layouts.Settings');

export const SettingsPage: React.FC = () => {
  const hubIsConnected = !!useHubToken();
  const dispatch = useDispatch();

  const history = useHistory();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  return (
    <ErrorBoundary
      FallbackComponent={MyFallbackComponent}
      onReset={() => {
        history.push(routePaths.dashboard(selectedWorkspace));
      }}
    >
      <AuthenticatedLayout>
        <SidebarContainer>
          <Box marginTop="xl" marginLeft="md" marginBottom="md">
            <Paragraph
              style={{
                fontSize: '42px',
                fontWeight: 'bold',
                lineHeight: '48px',
              }}
            >
              {translate('title')}
            </Paragraph>
          </Box>

          <Tabs
            pages={[
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
                lockedClickHandler: () =>
                  dispatch({ type: hubConnectionPromptActionTypes.show }),
              },
              {
                text: translate('tabs.plugins.text'),
                Component: Plugins,
                path: routePaths.settings.myPlugins,
                locked: !hubIsConnected,
                lockedClickHandler: () =>
                  dispatch({ type: hubConnectionPromptActionTypes.show }),
              },
            ]}
            basePath={routePaths.settings.base}
          />
        </SidebarContainer>
      </AuthenticatedLayout>
    </ErrorBoundary>
  );
};

export default SettingsPage;
