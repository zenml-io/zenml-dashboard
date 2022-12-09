import React from 'react';
import { MenuItem } from './MenuItem';
import { routePaths } from '../../../../../../../routes/routePaths';
import { icons } from '../../../../../../components';
import { iconSizes, iconColors } from '../../../../../../../constants';
import { translate } from '../translate';
import { useLocationPath } from '../../../../../../hooks';
import { matchPath } from 'react-router-dom';
import { useSelector } from './../../../../../../../ui/hooks';
import {
  projectSelectors,
  stackComponentSelectors,
} from '../../../../../../../redux/selectors';

export const Menu: React.FC = () => {
  const locationPath = useLocationPath();

  const stackComponentsTypes: any[] = useSelector(
    stackComponentSelectors.stackComponentTypes,
  );
  const selectedProject = useSelector(projectSelectors.selectedProject);

  return (
    <>
      <MenuItem
        id='pipelines'
        // isActive={() => {
        //   return (
        //     !!matchPath(locationPath, {
        //       path: routePaths.pipelines.base,
        //       exact: false,
        //     }) ||
        //     !!matchPath(locationPath, {
        //       path: routePaths.pipeline.base(':id'),
        //       exact: false,
        //     })
        //   );
        // }}
        Icon={() => (
          <icons.pipeline color={iconColors.white} size={iconSizes.md} />
        )}
        to={routePaths.pipelines.list(selectedProject)}
        text={translate('menu.pipelines.text')}
      />
      <MenuItem
        id='runs'
        // isActive={() => {
        //   return (
        //     !!matchPath(locationPath, {
        //       path: routePaths.pipelines.allRuns(selectedProject),
        //       exact: false,
        //     }) ||
        //     !!matchPath(locationPath, {
        //       path: routePaths.run.run.base(':id'),
        //       exact: false,
        //     })
        //   );
        // }}
        Icon={() => (
          <icons.pipeline color={iconColors.white} size={iconSizes.md} />
        )}
        to={routePaths.pipelines.allRuns(selectedProject)}
        text={'Runs'}
      />
      <MenuItem
        id='stack'
        // isActive={() => {
        //   return (
        //     !!matchPath(locationPath, {
        //       path: routePaths.stacks.base,
        //       exact: false,
        //     }) ||
        //     !!matchPath(locationPath, {
        //       path: routePaths.stack.base(':id'),
        //       exact: false,
        //     })
        //   );
        // }}
        Icon={() => (
          <icons.stack color={iconColors.white} size={iconSizes.md} />
        )}
        to={routePaths.stacks.list(selectedProject)}
        text={translate('menu.stacks.text')}
      />

      <MenuItem
        id='stack-component'
        isActive={() => {
          return !!matchPath(locationPath, {
            path: routePaths.stackComponents.base('', selectedProject),
            exact: false,
          });
        }}
        Icon={() => (
          <icons.stackComponent color={iconColors.white} size={iconSizes.md} />
        )}
        to={routePaths.stackComponents.base(
          stackComponentsTypes ? stackComponentsTypes[0] : '',
          selectedProject,
        )}
        text={translate('menu.stackComponents.text')}
      />

      {locationPath.includes('components') &&
        stackComponentsTypes?.map((item) => (
          <MenuItem
            // isActive={() => {
            //   return !!matchPath(locationPath, {
            //     path: routePaths.stackComponents.base(item, selectedProject),
            //     exact: false,
            //   });
            // }}
            subItem={true}
            Icon={() => (
              <icons.stackComponent
                color={iconColors.white}
                size={iconSizes.md}
              />
            )}
            to={routePaths.stackComponents.base(item, selectedProject)}
            text={item}
          />
        ))}
    </>
  );
};
