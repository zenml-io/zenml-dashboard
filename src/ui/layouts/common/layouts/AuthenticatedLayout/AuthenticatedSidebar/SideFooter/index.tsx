import React from 'react';
import { MenuItem } from '../Menu/MenuItem';
import { MenuItemExternal } from './MenuItemExternal';
import { routePaths } from '../../../../../../../routes/routePaths';
import { Box, Separator, icons } from '../../../../../../components';
import { iconSizes, iconColors } from '../../../../../../../constants';
import { translate } from '../translate';

export const SideFooter: React.FC = () => {
  return (
    <>
     <Box marginHorizontal="md">
        <Separator.LightNew />
      </Box> 

      <MenuItemExternal
        Icon={() => (
          <icons.docs color={iconColors.white} size={iconSizes.md} />
        )}
        to='https://www.google.com/' text="Documentation" />  
      <MenuItemExternal
        Icon={() => (
          <icons.example color={iconColors.white} size={iconSizes.md} />
        )} to='https://www.google.com/' text="Example & Tutorials" />  
      <MenuItemExternal
        Icon={() => (
          <icons.tool color={iconColors.white} size={iconSizes.md} /> 
        )} to='https://www.google.com/' text="Report Issue" />  
      <MenuItem
        Icon={() => (
          <icons.settings color={iconColors.white} size={iconSizes.md} />
        )} to={routePaths.settings.personalDetails} text={translate('menu.setting.text')} exact />

        <Box style={{ color: '#fff', fontFamily: 'sans-serif' }} paddingLeft='sm' paddingTop="md" paddingBottom="sm">
          <h5>UI Version v0.14.0</h5>
          <h5>ZenMl v0.14.0</h5>
        </Box>
      </>
  );
};
