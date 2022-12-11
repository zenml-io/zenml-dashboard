import React from 'react';
import { MenuItem } from './MenuItem';
import { routePaths } from '../../../../../../../routes/routePaths';
import { Box, Separator, icons } from '../../../../../../components';
import { iconSizes, iconColors, DEFAULT_PROJECT_NAME } from '../../../../../../../constants';
import { translate } from '../translate';

export const SideHeader: React.FC = () => {

  const url_string = window.location.href; 
  const url = new URL(url_string);
  const projectName = url.searchParams.get("project");

  return (
    <>
      <MenuItem
        Icon={() => <icons.home color={iconColors.white} size={iconSizes.md} />}
        to={routePaths.home + `?project=${projectName ? projectName : DEFAULT_PROJECT_NAME}`}
        text={translate('menu.home.text')}
        exact
      />
      <Box marginHorizontal="md" paddingTop='md'>
        <Separator.LightNew />
      </Box>
    </>
  );
};
