import React from 'react';
import { MenuItem } from './MenuItem';
import { routePaths } from '../../../../../../../routes/routePaths';
import { Box, Separator, icons } from '../../../../../../components';
import { iconSizes, iconColors } from '../../../../../../../constants';
import { translate } from '../translate';
import { useSelector } from '../../../../../../hooks';
import { projectSelectors } from '../../../../../../../redux/selectors';

export const SideHeader: React.FC = () => {
  const url = window.location.pathname;
  const selectedProject = useSelector(projectSelectors.selectedProject);
  return (
    <>
      <MenuItem
        Icon={() => <icons.home color={iconColors.white} size={iconSizes.md} />}
        to={routePaths.home(
          url.includes('projects') ? url.split('/')[2] : selectedProject,
        )}
        text={translate('menu.home.text')}
        exact
      />
      <Box marginHorizontal="md" paddingTop="md">
        <Separator.LightNew />
      </Box>
    </>
  );
};
