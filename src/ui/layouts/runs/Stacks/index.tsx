import React from 'react';
import { translate } from './translate';
import { List } from './List';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';

import { useService } from './useService';
import { useSelector } from '../../../hooks';
import { projectSelectors } from '../../../../redux/selectors';

export const Stacks: React.FC = () => {
  const { setFetching } = useService();
  console.log(setFetching);
  const selectedProject = useSelector(projectSelectors.selectedProject);
  return (
    <BasePage
      tabPages={[
        {
          text: translate('tabs.stacks.text'),
          Component: List,
          path: routePaths.stacks.list(selectedProject),
        },
      ]}
      tabBasePath={routePaths.stacks.base}
      breadcrumbs={[
        {
          name: translate('header.breadcrumbs.stacks.text'),
          clickable: true,
          to: routePaths.stacks.list(selectedProject),
        },
      ]}
      headerWithButtons
      renderHeaderRight={() => <></>}
    />
  );
};

export default Stacks;
