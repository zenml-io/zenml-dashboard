import React from 'react';
// import { translate } from './translate';
import { List } from './List';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';
// import { WorkspaceDropdown } from './WorkspaceDropdown';
import { useService } from './useService';
import { useLocationPath } from '../../../hooks';
import { WorkspaceDropdown } from './WorkspaceDropdown';
// const PAGES = [
//   {
//     text: 'Alerter',
//     Component: List,
//     path: routePaths.stackComponents.base('alerter'),
//   },
//   // {
//   //   text: translate('tabs.allRuns.text'),
//   //   Component: AllRuns,
//   //   path: routePaths.stacks.allRuns,
//   // },
// ];

// const BREADCRUMBS = [
//   {
//     name: 'Components',
//     clickable: true,
//     to: routePaths.stackComponents.base('alerter'),
//   },
// ];

export const Stacks: React.FC = () => {
  const locationPath = useLocationPath();
  const {
    setFetching,
    setCurrentWorkspace,
    currentWorkspace,
    workspaces,
  } = useService();

  return (
    <BasePage
      tabPages={[
        {
          text: locationPath.split('/')[2],
          Component: List,
          path: routePaths.stackComponents.base(locationPath.split('/')[2]),
        },
      ]}
      tabBasePath={routePaths.stackComponents.base('')}
      breadcrumbs={[
        {
          name: locationPath.split('/')[2],
          clickable: true,
          to: routePaths.stackComponents.base(locationPath.split('/')[2]),
        },
      ]}
      headerWithButtons
      renderHeaderRight={() => (
        <WorkspaceDropdown
          workspaces={workspaces}
          currentWorkspace={currentWorkspace}
          setCurrentWorkspace={(workspace: TWorkspace): void => {
            if (currentWorkspace && workspace.id !== currentWorkspace.id) {
              setFetching(true);
            }
            setCurrentWorkspace(workspace);
          }}
        />
      )}
    />
  );
};

export default Stacks;
