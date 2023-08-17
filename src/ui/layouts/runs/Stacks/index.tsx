import React from 'react';
import { translate } from './translate';
import { List } from './List';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';

import { useService } from './useService';
import { useSelector } from '../../../hooks';
import { workspaceSelectors } from '../../../../redux/selectors';

export const Stacks: React.FC = () => {
  useService();

  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  return (
    <BasePage
      tabPages={[
        {
          text: translate('tabs.stacks.text'),
          Component: List,
          path: routePaths.stacks.list(selectedWorkspace),
        },
      ]}
      tabBasePath={routePaths.stacks.base}
      breadcrumbs={[
        {
          name: translate('header.breadcrumbs.stacks.text'),
          clickable: true,
          to: routePaths.stacks.list(selectedWorkspace),
        },
      ]}
      headerWithButtons
      renderHeaderRight={() => <></>}
    />
  );
};

export default Stacks;
