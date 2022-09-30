import React, { useState } from 'react';
// import { translate } from './translate';
import { List } from './List';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';
// import { WorkspaceDropdown } from './WorkspaceDropdown';
import { useService } from './useService';
import { useLocationPath } from '../../../hooks';
// import { WorkspaceDropdown } from './WorkspaceDropdown';
import FilterComponent, {
  getInitialFilterState,
} from '../../../components/Filters';
import { camelCaseToParagraph } from '../../../../utils';
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
    <FilterComponent
      getInitials={getInitialFilterState}
      filters={filters}
      setFilter={setFilter}
    >
      <List filter={getFilter(filters)} />
    </FilterComponent>
  );
};

export const Stacks: React.FC = () => {
  const locationPath = useLocationPath();
  const {
    setFetching,
    // setCurrentWorkspace,
    // currentWorkspace,
    // workspaces,
  } = useService();
  console.log(setFetching);

  return (
    <BasePage
      tabPages={[
        {
          text: camelCaseToParagraph(locationPath.split('/')[2]),
          Component: FilterWrapper,
          path: routePaths.stackComponents.base(locationPath.split('/')[2]),
        },
      ]}
      tabBasePath={routePaths.stackComponents.base('')}
      breadcrumbs={[
        {
          name: camelCaseToParagraph(locationPath.split('/')[2]),
          clickable: true,
          to: routePaths.stackComponents.base(locationPath.split('/')[2]),
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

export default Stacks;
