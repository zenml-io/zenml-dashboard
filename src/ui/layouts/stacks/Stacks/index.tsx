import React, { useState } from 'react';
import { translate } from './translate';
import { List } from './List';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';
import { WorkspaceDropdown } from './WorkspaceDropdown';
import { useService } from './useService';

import FilterComponent, {
  getInitialFilterState,
} from '../../../components/Filters';

const FilterWrapper = () => {
  // TODO: Dev please note: getInitialFilterState is for stack inital filter value for any other component you need to modify it
  const [filters, setFilter] = useState([getInitialFilterState()]);
  function getFilter(values: any) {
    const filterValuesMap = values.map((v: any) => {
      return {
        column: v.column.selectedValue,
        type: v.contains.selectedValue,
        value: v.filterValue,
      };
    });
    return filterValuesMap;
  }
  return (
    <FilterComponent filters={filters} setFilter={setFilter}>
      <List filter={getFilter(filters)} />
    </FilterComponent>
  );
};

const PAGES = [
  {
    text: translate('tabs.stacks.text'),
    Component: FilterWrapper,
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
  const { setFetching } = useService();

  return (
    <BasePage
      tabPages={PAGES}
      tabBasePath={routePaths.stacks.base}
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

export default Stacks;
