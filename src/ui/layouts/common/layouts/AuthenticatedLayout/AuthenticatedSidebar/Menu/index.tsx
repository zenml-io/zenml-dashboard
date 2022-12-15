import React from 'react';
import { MenuItem } from './MenuItem';
import { routePaths } from '../../../../../../../routes/routePaths';
import { icons } from '../../../../../../components';
import { iconSizes, iconColors } from '../../../../../../../constants';
import { translate } from '../translate';
import { useLocationPath } from '../../../../../../hooks';
// import { matchPath } from 'react-router-dom';
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
        Icon={() => (
          <icons.pipeline color={iconColors.white} size={iconSizes.md} />
        )}
        to={routePaths.pipelines.base}
        text={translate('menu.pipelines.text')}
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
        // to={routePaths.pipelines.list(projectName ? projectName : DEFAULT_PROJECT_NAME)}
      />
      <MenuItem
        id='runs'
        Icon={() => (
          <icons.pipeline color={iconColors.white} size={iconSizes.md} />
        )}
        to={routePaths.pipelines.allRuns(selectedProject)}
        isActive={() => window.location.href?.includes('runs')}
        text={'Runs'}
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
      />
      <MenuItem
        id='stack'
        Icon={() => (
          <icons.stack color={iconColors.white} size={iconSizes.md} />
        )}
        to={routePaths.stacks.base}
        text={translate('menu.stacks.text')}
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
        // to={routePaths.stacks.list(selectedProject)}
      />

      <MenuItem
        id='stack-component'
        // isActive={() => {
        //   return !!matchPath(locationPath, {
        //     path: routePaths.stackComponents.base('', project) + `?project=${project}`,
        //     exact: false,
        //   });
        // }}
        isActive={() => window.location.href?.includes('components')}
        Icon={() => (
          <icons.stackComponent color={iconColors.white} size={iconSizes.md} />
        )}
        to={routePaths.stackComponents.base(stackComponentsTypes ? stackComponentsTypes[0] : '', selectedProject)}
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
            isActive={() => window.location.href?.includes(item)}
            subItem={true}
            Icon={() => (
              <icons.stackComponent color={iconColors.white} size={iconSizes.md} />
            )}
            to={routePaths.stackComponents.base(item, selectedProject)}
            text={item}
          />
        ))}
    </>
  );
};
