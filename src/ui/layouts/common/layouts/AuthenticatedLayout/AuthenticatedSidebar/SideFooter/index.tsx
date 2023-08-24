import React from 'react';
import { MenuItem } from '../Menu/MenuItem';
import { MenuItemExternal } from './MenuItemExternal';
import { routePaths } from '../../../../../../../routes/routePaths';
import { Box, Separator, icons } from '../../../../../../components';
import { iconSizes, iconColors } from '../../../../../../../constants';

export const SideFooter: React.FC = () => {
  return (
    <>
      <MenuItemExternal
        id="report"
        Icon={() => <icons.supportAgent size={iconSizes.md} />}
        to="https://github.com/zenml-io/zenml-dashboard/issues/new/choose"
        text="Report Issue"
      />
      <MenuItem
        id="settings"
        Icon={() => <icons.settings size={iconSizes.md} />}
        innerItem={window.location.href?.includes('settings')}
        isActive={() => window.location.href?.includes('settings')}
        to={routePaths.settings.personalDetails}
        text=""
      />
    </>
  );
};
