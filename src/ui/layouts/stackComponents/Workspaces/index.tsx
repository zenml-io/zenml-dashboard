import React from 'react';
import { translate } from './translate';
import { AllWorkspaces } from './AllWorkspaces';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';

const PAGES = [
  {
    text: translate('tabs.allWorkspaces.text'),
    Component: AllWorkspaces,
    path: routePaths.workspaces.list,
  },
];

const BREADCRUMBS = [
  {
    name: translate('header.breadcrumbs.workspaces.text'),
    clickable: true,
    to: routePaths.pipelines.list,
  },
];

export const Workspaces: React.FC = () => {
  return (
    <BasePage
      tabPages={PAGES}
      tabBasePath={routePaths.workspaces.base}
      breadcrumbs={BREADCRUMBS}
      headerWithButtons
    />
  );
};

export default Workspaces;
