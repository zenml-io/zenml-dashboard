import React from 'react';
import { translate } from './translate';
import { List } from './List';
import { AllRuns } from './AllRuns';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';
// import { WorkspaceDropdown } from './WorkspaceDropdown';
import { useService } from './useService';
import { useLocationPath } from '../../../hooks';

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

// const BREADCRUMBS = [
//   {
//     name: translate('header.breadcrumbs.pipelines.text'),
//     clickable: true,
//     to: routePaths.pipelines.list,
//   },
// ];

export const Pipelines: React.FC = () => {
  const { setFetching } = useService();
  console.log(setFetching);
  const locationPath = useLocationPath();

  return (
    <BasePage
      tabPages={PAGES}
      tabBasePath={routePaths.pipelines.base}
      breadcrumbs={[
        {
          name: locationPath.includes('pipelines/list')
            ? translate('header.breadcrumbs.pipelines.text')
            : 'Runs',
          clickable: true,
          to: locationPath.includes('pipelines/list')
            ? routePaths.pipelines.list
            : routePaths.pipelines.allRuns,
        },
      ]}
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
