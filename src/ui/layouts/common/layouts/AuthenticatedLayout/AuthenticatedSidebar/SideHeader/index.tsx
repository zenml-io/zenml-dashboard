import React from 'react';
import { MenuItem } from '../Menu/MenuItem';
import { routePaths } from '../../../../../../../routes/routePaths';
import { Box, Separator, icons } from '../../../../../../components';
import { iconSizes, iconColors } from '../../../../../../../constants';
import { translate } from '../translate';

export const SideHeader: React.FC = () => {

  return (
    <>
      <MenuItem
        Icon={() => <icons.home color={iconColors.white} size={iconSizes.md} />}
        to={routePaths.home}
        text={translate('menu.home.text')}
        exact
      />
      <Box marginHorizontal="md">
        <Separator.LightNew />
      </Box>
    </>
  );
};
