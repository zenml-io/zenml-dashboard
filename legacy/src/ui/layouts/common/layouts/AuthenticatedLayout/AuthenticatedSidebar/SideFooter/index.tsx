import React from 'react';
import { MenuItem } from '../Menu/MenuItem';
import { MenuItemExternal } from './MenuItemExternal';
import { routePaths } from '../../../../../../../routes/routePaths';
import { Box, Separator, icons } from '../../../../../../components';
import { iconSizes, iconColors } from '../../../../../../../constants';

export const SideFooter: React.FC = () => {
  return (
    <>
      <Box marginHorizontal="md" paddingBottom="md">
        <Separator.LightNew />
      </Box>

      <div style={{ marginBottom: '-11px', marginLeft: '-3.5px' }}>
        <MenuItemExternal
          id="report"
          Icon={() => (
            <icons.supportAgent color={iconColors.white} size={iconSizes.md} />
          )}
          to="https://github.com/zenml-io/zenml-dashboard/issues/new/choose"
          text="Report Issue"
        />
      </div>
      <MenuItem
        id="settings"
        Icon={() => (
          <icons.settings color={iconColors.white} size={iconSizes.md} />
        )}
        innerItem={window.location.href?.includes('settings')}
        isActive={() => window.location.href?.includes('settings')}
        to={routePaths.settings.personalDetails}
        text=""
      />
    </>
  );
};
