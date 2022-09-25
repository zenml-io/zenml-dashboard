import React from 'react';

import { routePaths } from '../../../../routes/routePaths';
import { translate } from './translate';
import { Configuration } from './Configuration';
import { Runs } from './Runs';
import { BasePage } from '../BasePage';
import { useService } from './useService';
import { useLocationPath } from '../../../hooks';

const getTabPages = (stackId: TId): TabPage[] => {
  return [
    {
      text: translate('tabs.configuration.text'),
      Component: () => <Configuration stackId={stackId} />,
      path: routePaths.stackComponents.configuration(stackId),
    },
    {
      text: translate('tabs.runs.text'),
      Component: () => <Runs stackComponentId={stackId} />,
      path: routePaths.stackComponents.runs(stackId),
    },
  ];
};

const getBreadcrumbs = (stackId: TId, locationPath: any): TBreadcrumb[] => {
  return [
    {
      name: 'Components',
      clickable: true,
      to: routePaths.stackComponents.base(locationPath.split('/')[2]),
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
  const locationPath = useLocationPath();
  const { stackComponent } = useService();

  const tabPages = getTabPages(stackComponent.id);
  const breadcrumbs = getBreadcrumbs(stackComponent.id, locationPath);

  return (
    <BasePage
      headerWithButtons
      tabPages={tabPages}
      tabBasePath={routePaths.stackComponents.base(stackComponent.id)}
      breadcrumbs={breadcrumbs}
    />
  );
};

export default StackDetail;
