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
      path: routePaths.stackComponents.configuration(stackId),
    },
    {
      text: translate('tabs.runs.text'),
      Component: () => <Runs stackId={stackId} />,
      path: routePaths.stackComponents.runs(stackId),
    },
  ];
};

const getBreadcrumbs = (stackId: TId): TBreadcrumb[] => {
  return [
    {
      name: 'components',
      clickable: true,
      to: routePaths.stackComponents.base('alerter'),
    },
    {
      name: 'alerter',
      clickable: true,
      to: routePaths.stackComponents.configuration(stackId),
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
