import React from 'react';
import { translate } from './translate';
import { List } from './List';
import { AllRuns } from './AllRuns';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';
// import { WorkspaceDropdown } from './WorkspaceDropdown';
// import { useService } from './useService';

const PAGES = [
  {
    text: translate('tabs.pipelines.text'),
    Component: List,
    path: routePaths.pipelines.list,
  },
  {
    text: translate('tabs.allRuns.text'),
    Component: AllRuns,
    path: routePaths.pipelines.allRuns,
  },
];

const BREADCRUMBS = [
  {
    name: translate('header.breadcrumbs.pipelines.text'),
    clickable: true,
    to: routePaths.pipelines.list,
  },
];

export const Pipelines: React.FC = () => {
  // const {
  //   setFetching,
  //   setCurrentWorkspace,
  //   currentWorkspace,
  //   workspaces,
  // } = useService();

  return (
    <BasePage
      tabPages={PAGES}
      tabBasePath={routePaths.pipelines.base}
      breadcrumbs={BREADCRUMBS}
      headerWithButtons
      renderHeaderRight={() => (
        <></>
        // <WorkspaceDropdown
        //   workspaces={workspaces}
        //   currentWorkspace={currentWorkspace}
        //   setCurrentWorkspace={(workspace: TWorkspace): void => {
        //     if (currentWorkspace && workspace.id !== currentWorkspace.id) {
        //       setFetching(true);
        //     }
        //     setCurrentWorkspace(workspace);
        //   }}
        // />
      )}
    />
  );
};

export default Pipelines;
