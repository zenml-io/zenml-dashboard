import React from 'react';

import { routePaths } from '../../../../routes/routePaths';
import { translate } from './translate';
import { Configuration } from './Configuration';
import { Runs } from './Runs';
import { BasePage } from '../BasePage';
import { useService } from './useService';
import { useLocationPath } from '../../../hooks';

const getTabPages = (stackId: TId, locationPath: any): TabPage[] => {
  return [
    {
      text: translate('tabs.configuration.text'),
      Component: () => <Configuration stackId={stackId} />,
      path: routePaths.stackComponents.configuration(
        locationPath.split('/')[2],
        stackId,
      ),
    },
    {
      text: translate('tabs.runs.text'),
      Component: () => <Runs stackComponentId={stackId} />,
      path: routePaths.stackComponents.runs(
        locationPath.split('/')[2],
        stackId,
      ),
    },
  ];
};

const getBreadcrumbs = (stackId: TId, locationPath: any): TBreadcrumb[] => {
  return [
    {
      name: locationPath.split('/')[2],
      clickable: true,
      to: routePaths.stackComponents.base(locationPath.split('/')[2]),
    },
    {
      name: stackId,
      clickable: true,
      to: routePaths.stackComponents.configuration(
        locationPath.split('/')[2],
        stackId,
      ),
    },
  ];
};

export interface StackDetailRouteParams {
  id: TId;
}

export const StackDetail: React.FC = () => {
  const locationPath = useLocationPath();
  const { stackComponent } = useService();

  const tabPages = getTabPages(stackComponent.id, locationPath);
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
