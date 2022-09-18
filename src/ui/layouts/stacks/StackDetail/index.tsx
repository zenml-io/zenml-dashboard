import React from 'react';

import { routePaths } from '../../../../routes/routePaths';
import { translate } from './translate';
import { Configuration } from './Configuration';
import { Runs } from './Runs';
import { BasePage } from '../BasePage';
import { useService } from './useService';

const getTabPages = (stackId: TId): TabPage[] => {
  return [
    {
      text: translate('tabs.configuration.text'),
      Component: () => <Configuration stackId={stackId} />,
      path: routePaths.stack.configuration(stackId),
    },
    {
      text: translate('tabs.runs.text'),
      Component: () => <Runs stackId={stackId} />,
      path: routePaths.stack.runs(stackId),
    },
  ];
};

const getBreadcrumbs = (stackId: TId): TBreadcrumb[] => {
  return [
    {
      name: translate('header.breadcrumbs.stacks.text'),
      clickable: true,
      to: routePaths.stacks.list,
    },
    {
      name: stackId,
      clickable: true,
      to: routePaths.stack.configuration(stackId),
    },
  ];
};

export interface StackDetailRouteParams {
  id: TId;
}

export const StackDetail: React.FC = () => {
  const { stack } = useService();

  const tabPages = getTabPages(stack.id);
  const breadcrumbs = getBreadcrumbs(stack.id);

  return (
    <BasePage
      headerWithButtons
      tabPages={tabPages}
      tabBasePath={routePaths.stack.base(stack.id)}
      breadcrumbs={breadcrumbs}
    />
  );
};

export default StackDetail;
