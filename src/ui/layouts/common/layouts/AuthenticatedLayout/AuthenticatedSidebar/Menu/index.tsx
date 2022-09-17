import React from 'react';
import { MenuItem } from './MenuItem';
import { routePaths } from '../../../../../../../routes/routePaths';
import { icons } from '../../../../../../components';
import { iconSizes, iconColors } from '../../../../../../../constants';
import { translate } from '../translate';
import { useLocationPath } from '../../../../../../hooks';
import { matchPath } from 'react-router-dom';

export const Menu: React.FC = () => {
  const locationPath = useLocationPath();
  const stackComponentsTypes = ['Alerter', 'Test'];
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
      {/* will remove this code later */}
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
        isActive={() => {
          return (
            !!matchPath(locationPath, {
              path: routePaths.stacks.base,
              exact: false,
            }) ||
            !!matchPath(locationPath, {
              path: routePaths.stack.base(':id'),
              exact: false,
            })
          );
        }}
        Icon={() => (
          <icons.code color={iconColors.darkGrey} size={iconSizes.md} />
        )}
        to={routePaths.stacks.list}
        text={translate('menu.stacks.text')}
      />
      <MenuItem
        Icon={() => (
          <icons.data color={iconColors.darkGrey} size={iconSizes.md} />
        )}
        to={routePaths.stackComponents.base(stackComponentsTypes[0])}
        text={translate('menu.stackComponents.text')}
      />
      {locationPath.includes('components') && (
        <>
          {/* <MenuItem
            // isActive={() => {
            //   return !!matchPath(locationPath, {
            //     path: routePaths.stackComponents.base(item),
            //     exact: false,
            //   });
            // }}
            subItem={true}
            Icon={() => (
              <icons.data color={iconColors.darkGrey} size={iconSizes.md} />
            )}
            to={routePaths.stackComponents.base(stackComponentsTypes[0])}
            text={translate('menu.stackComponents.text')}
          /> */}
          ;
          {stackComponentsTypes?.map((item) => (
            <>
              <MenuItem
                // isActive={() => {
                //   return !!matchPath(locationPath, {
                //     path: routePaths.stackComponents.base(item),
                //     exact: false,
                //   });
                // }}
                subItem={true}
                Icon={() => (
                  <icons.data color={iconColors.darkGrey} size={iconSizes.md} />
                )}
                to={routePaths.stackComponents.base(item)}
                text={item}
              />
              ;
            </>
          ))}
          {/* 
          <MenuItem
            subItem={true}
            Icon={() => (
              <icons.data color={iconColors.darkGrey} size={iconSizes.md} />
            )}
            to={routePaths.datasources}
            text={translate('menu.stackComponents.text')}
          /> */}
        </>
      )}
      <MenuItem
        Icon={() => (
          <icons.settings color={iconColors.darkGrey} size={iconSizes.md} />
        )}
        to={routePaths.settings.personalDetails}
        text={translate('menu.setting.text')}
      />
      {/* will remove this code later */}
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
