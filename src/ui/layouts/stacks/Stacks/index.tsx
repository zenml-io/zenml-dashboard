import React from 'react';
import { translate } from './translate';
import { List } from './List';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';
import { WorkspaceDropdown } from './WorkspaceDropdown';
import { useService } from './useService';

const PAGES = [
  {
    text: translate('tabs.stacks.text'),
    Component: List,
    path: routePaths.stacks.list,
  },
  // {
  //   text: translate('tabs.allRuns.text'),
  //   Component: AllRuns,
  //   path: routePaths.stacks.allRuns,
  // },
];

const BREADCRUMBS = [
  // {
  //   name: translate('header.breadcrumbs.dashBoard.text'),
  //   clickable: true,
  //   to: routePaths.home,
  // },
  {
    name: translate('header.breadcrumbs.stacks.text'),
    clickable: true,
    to: routePaths.stacks.list,
  },
];

export const Stacks: React.FC = () => {
  const {
    setFetching,
    setCurrentWorkspace,
    currentWorkspace,
    workspaces,
  } = useService();

  return (
    <BasePage
      tabPages={PAGES}
      tabBasePath={routePaths.stacks.base}
      breadcrumbs={BREADCRUMBS}
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
