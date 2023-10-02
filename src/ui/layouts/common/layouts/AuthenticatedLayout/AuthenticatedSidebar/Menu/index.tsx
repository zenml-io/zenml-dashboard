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
        text={translate('menu.pipelines.text')}
        isActive={() => window.location.href?.includes('pipelines')}
        to={routePaths.pipelines.list(
          selectedWorkspace ? selectedWorkspace : DEFAULT_WORKSPACE_NAME,
        )}
      />
      <MenuItem
        id="runs"
        Icon={() => <icons.run color={iconColors.white} size={iconSizes.md} />}
        to={routePaths.run.run.list(
          selectedWorkspace ? selectedWorkspace : DEFAULT_WORKSPACE_NAME,
        )}
        isActive={() => window.location.href?.includes('all-runs')}
        text={'Runs'}
        innerItem={window.location.href?.includes('all-runs')}
      />
      <MenuItem
        id="stack"
        Icon={() => (
          <icons.stack color={iconColors.white} size={iconSizes.md} />
        )}
        innerItem={window.location.href?.includes('stacks')}
        text={translate('menu.stacks.text')}
        isActive={() =>
          window.location.href?.includes('stacks') &&
          !window.location.href?.includes('components')
        }
        to={routePaths.stacks.list(
          selectedWorkspace ? selectedWorkspace : DEFAULT_WORKSPACE_NAME,
        )}
      />

      <MenuItem
        id="stack-component"
        isActive={() =>
          window.location.href?.includes('components') &&
          !window.location.href?.includes('connectors')
        }
        Icon={() => (
          <icons.stackComponent color={iconColors.white} size={iconSizes.md} />
        )}
        innerItem={window.location.href?.includes('components')}
        to={routePaths.stackComponents.base(
          stackComponentsTypes ? stackComponentsTypes[0] : '',
          selectedWorkspace ? selectedWorkspace : DEFAULT_WORKSPACE_NAME,
        )}
        text={translate('menu.stackComponents.text')}
      />

      <MenuItem
        id="repositories"
        isActive={() => window.location.href?.includes('repositories')}
        innerItem={window.location.href?.includes('repositories')}
        to={routePaths.repositories.list(
          selectedWorkspace ? selectedWorkspace : DEFAULT_WORKSPACE_NAME,
        )}
        text={translate('menu.repositories.text')}
        Icon={() => (
          <icons.repository color={iconColors.white} size={iconSizes.md} />
        )}
      />

      <MenuItem
        id="secrets"
        Icon={() => <icons.lock color={iconColors.white} size={iconSizes.md} />}
        innerItem={window.location.href?.includes('secrets')}
        text={translate('menu.secrets.text')}
        isActive={() => window.location.href?.includes('secrets')}
        to={routePaths.secrets.list(
          selectedWorkspace ? selectedWorkspace : DEFAULT_WORKSPACE_NAME,
        )}
      />
      <MenuItem
        id="plugins"
        isActive={() =>
          window.location.href?.includes('plugins') &&
          !window.location.href?.includes('my-plugins')
        }
        Icon={() => (
          <icons.storefront color={iconColors.white} size={iconSizes.md} />
        )}
        innerItem={window.location.href?.includes('plugins')}
        to={routePaths.plugins.list(
          selectedWorkspace ? selectedWorkspace : DEFAULT_WORKSPACE_NAME,
        )}
        text={translate('menu.plugins.text')}
      />

      <MenuItem
        id="connector"
        isActive={() => window.location.href?.includes('connectors')}
        Icon={() => (
          <icons.connector color={iconColors.white} size={iconSizes.md} />
        )}
        innerItem={window.location.href?.includes('connectors')}
        to={routePaths.connectors.base}
        text={translate('menu.connectors.text')}
      />
    </>
  );
};
