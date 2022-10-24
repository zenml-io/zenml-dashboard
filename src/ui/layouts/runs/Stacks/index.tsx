import React from 'react';
import { translate } from './translate';
import { List } from './List';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';

import { useService } from './useService';

const PAGES = [
  {
    text: translate('tabs.stacks.text'),
    Component: List,
    path: routePaths.stacks.list,
  },
];

const BREADCRUMBS = [
  {
    name: translate('header.breadcrumbs.stacks.text'),
    clickable: true,
    to: routePaths.stacks.list,
  },
];

export const Stacks: React.FC = () => {
  const { setFetching } = useService();
  console.log(setFetching);

  return (
    <BasePage
      tabPages={PAGES}
      tabBasePath={routePaths.stacks.base}
      breadcrumbs={BREADCRUMBS}
      headerWithButtons
      renderHeaderRight={() => <></>}
    />
  );
};

export default Stacks;
