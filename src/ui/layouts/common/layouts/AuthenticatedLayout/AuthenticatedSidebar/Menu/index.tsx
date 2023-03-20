import React from 'react';
import { MenuItem } from './MenuItem';
import { routePaths } from '../../../../../../../routes/routePaths';
import { icons } from '../../../../../../components';
import {
  iconSizes,
  iconColors,
  DEFAULT_WORKSPACE_NAME,
} from '../../../../../../../constants';
import { translate } from '../translate';
import { useSelector } from './../../../../../../../ui/hooks';
import {
  workspaceSelectors,
  stackComponentSelectors,
} from '../../../../../../../redux/selectors';
// import { matchPath } from 'react-router-dom';

export const Menu: React.FC = () => {
  const stackComponentsTypes: any[] = useSelector(
    stackComponentSelectors.stackComponentTypes,
  );
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  return (
    <>
      <MenuItem
        id="pipelines"
        Icon={() => (
          <icons.pipeline color={iconColors.white} size={iconSizes.md} />
        )}
        innerItem={window.location.href?.includes('pipelines')}
        // to={routePaths.pipelines.base}
        text={translate('menu.pipelines.text')}
        isActive={() => window.location.href?.includes('pipelines')}
        to={routePaths.pipelines.list(
          selectedWorkspace ? selectedWorkspace : DEFAULT_WORKSPACE_NAME,
        )}
      />
      <MenuItem
        id="runs"
        Icon={() => <icons.run color={iconColors.white} size={iconSizes.md} />}
        to={routePaths.pipelines.allRuns(selectedWorkspace)}
        isActive={() => window.location.href?.includes('all-runs')}
        text={'Runs'}
        innerItem={window.location.href?.includes('all-runs')}
        // isActive={() => {
        //   return (
        //     !!matchPath(locationPath, {
        //       path: routePaths.pipelines.allRuns(selectedWorkspace),
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
        id="stack"
        Icon={() => (
          <icons.stack color={iconColors.white} size={iconSizes.md} />
        )}
        innerItem={window.location.href?.includes('stacks')}
        // to={routePaths.stacks.base}
        text={translate('menu.stacks.text')}
        isActive={() =>
          window.location.href?.includes('stacks') &&
          !window.location.href?.includes('components')
        }
        to={routePaths.stacks.list(selectedWorkspace)}
      />

      <MenuItem
        id="stack-component"
        // isActive={() => {
        //   return !!matchPath(locationPath, {
        //     path: routePaths.stackComponents.base('', workspace) + `?workspace=${workspace}`,
        //     exact: false,
        //   });
        // }}

        isActive={() => window.location.href?.includes('components')}
        Icon={() => (
          <icons.stackComponent color={iconColors.white} size={iconSizes.md} />
        )}
        innerItem={window.location.href?.includes('components')}
        to={routePaths.stackComponents.base(
          stackComponentsTypes ? stackComponentsTypes[0] : '',
          selectedWorkspace,
        )}
        text={translate('menu.stackComponents.text')}
      />

      <MenuItem
        id="plugins"
        isActive={() => window.location.href?.includes('plugins')}
        Icon={() => (
          <icons.storefront color={iconColors.white} size={iconSizes.md} />
        )}
        innerItem={window.location.href?.includes('plugins')}
        to={routePaths.plugins.list(selectedWorkspace)}
        text={translate('menu.plugins.text')}
      />
    </>
  );
};

// {locationPath.includes('components') &&
// stackComponentsTypes?.map((item: any) => (
//   <MenuItem
//     // isActive={() => {
//     //   return !!matchPath(locationPath, {
//     //     path: routePaths.stackComponents.base(item, selectedWorkspace),
//     //     exact: false,
//     //   });
//     // }}

//     isActive={() => window.location.href?.includes(item)}
//     subItem={true}
//     Icon={() => (
//       <>
//         {item === 'artifact_store' && (
//           <icons.artifact_store
//             color={iconColors.white}
//             size={iconSizes.md}
//           />
//         )}
//         {item === 'alerter' && (
//           <icons.alerter color={iconColors.white} size={iconSizes.md} />
//         )}
//         {item === 'annotator' && (
//           <icons.annotator
//             color={iconColors.white}
//             size={iconSizes.md}
//           />
//         )}
//         {item === 'container_registry' && (
//           <icons.container_registry
//             color={iconColors.white}
//             size={iconSizes.md}
//           />
//         )}
//         {item === 'experiment_tracker' && (
//           <icons.experiment_tracker
//             color={iconColors.white}
//             size={iconSizes.md}
//           />
//         )}

//         {item === 'feature_store' && (
//           <icons.feature_store
//             color={iconColors.white}
//             size={iconSizes.md}
//           />
//         )}
//         {item === 'model_deployer' && (
//           <icons.model_deployer
//             color={iconColors.white}
//             size={iconSizes.md}
//           />
//         )}
//         {item === 'secrets_manager' && (
//           <icons.secrets_manager
//             color={iconColors.white}
//             size={iconSizes.md}
//           />
//         )}
//         {item === 'orchestrator' && (
//           <icons.orchestrator
//             color={iconColors.white}
//             size={iconSizes.md}
//           />
//         )}
//         {item === 'step_operator' && (
//           <icons.step_operator
//             color={iconColors.white}
//             size={iconSizes.md}
//           />
//         )}
//         {item === 'data_validator' && (
//           <icons.data_validator
//             color={iconColors.white}
//             size={iconSizes.md}
//           />
//         )}
//       </>
//     )}
//     to={routePaths.stackComponents.base(item, selectedWorkspace)}
//     text={item}
//   />
// ))}
