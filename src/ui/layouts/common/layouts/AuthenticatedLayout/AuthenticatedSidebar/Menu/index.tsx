import React from 'react';
import { MenuItem } from './MenuItem';
import { routePaths } from '../../../../../../../routes/routePaths';
import { Separator, Box, icons } from '../../../../../../components';
import { iconSizes, iconColors } from '../../../../../../../constants';
import { translate } from '../translate';
import { useLocationPath } from '../../../../../../hooks';
import { matchPath } from 'react-router-dom';

export const Menu: React.FC = () => {
  const locationPath = useLocationPath();
  return (
    <>
      <MenuItem
        Icon={() => (
          <icons.home color={iconColors.darkGrey} size={iconSizes.md} />
        )}
        to={routePaths.home}
        text={translate('menu.home.text')}
        exact
      />
      {/* <Box marginVertical="md">
        <Separator.Light />
      </Box> */}
      <MenuItem
        isActive={() => {
          return (
            !!matchPath(locationPath, {
              path: routePaths.pipelines.base,
              exact: false,
            }) ||
            !!matchPath(locationPath, {
              path: routePaths.pipeline.base(':id'),
              exact: false,
            })
          );
        }}
        Icon={() => (
          <icons.stream color={iconColors.darkGrey} size={iconSizes.md} />
        )}
        to={routePaths.pipelines.list}
        text={translate('menu.pipelines.text')}
      />
      <MenuItem
        Icon={() => (
          <icons.code color={iconColors.darkGrey} size={iconSizes.md} />
        )}
        to={routePaths.workspaces.list}
        text={translate('menu.stacks.text')}
      />
      <MenuItem
        Icon={() => (
          <icons.data color={iconColors.darkGrey} size={iconSizes.md} />
        )}
        to={routePaths.datasources}
        text={translate('menu.stackComponents.text')}
      />
      <MenuItem
        Icon={() => (
          <icons.settings color={iconColors.darkGrey} size={iconSizes.md} />
        )}
        to={routePaths.settings.personalDetails}
        text={translate('menu.setting.text')}
      />
      {/* <MenuItem
        Icon={() => (
          <icons.table color={iconColors.darkGrey} size={iconSizes.md} />
        )}
        to={routePaths.models}
        text={translate('menu.models.text')}
      />
      <MenuItem
        Icon={() => (
          <icons.dashboard color={iconColors.darkGrey} size={iconSizes.md} />
        )}
        to={routePaths.deployments}
        text={translate('menu.deployments.text')}
      /> */}
    </>
  );
};
