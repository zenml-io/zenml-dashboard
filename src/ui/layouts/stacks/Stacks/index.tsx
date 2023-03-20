import React, { useState } from 'react';
import { translate } from './translate';
import { List } from './List';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';

import { useService } from './useService';

import FilterComponent, {
  getInitialFilterState,
} from '../../../components/Filters';
import { workspaceSelectors } from '../../../../redux/selectors';
import { useLocationPath, useSelector } from '../../../hooks';
// import { useSelector } from '../../../hooks';
// import { workspaceSelectors } from '../../../../redux/selectors';

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
  const { setFetching } = useService();
  console.log(setFetching);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const locationPath = useLocationPath();
  return (
    <BasePage
      tabPages={[
        {
          text: translate('tabs.stacks.text'),
          Component: FilterWrapper,
          // path: routePaths.stacks.base,
          path: routePaths.stacks.list(
            selectedWorkspace ? selectedWorkspace : locationPath.split('/')[2],
          ),
        },
      ]}
      tabBasePath={routePaths.stacks.base}
      breadcrumbs={
        [
          // {
          //   name: translate('header.breadcrumbs.stacks.text'),
          //   clickable: true,
          //   // to: routePaths.stacks.base,
          //   to: routePaths.stacks.list(
          //     selectedWorkspace ? selectedWorkspace : locationPath.split('/')[2],
          //   ),
          // },
        ]
      }
      title="Stacks"
      headerWithButtons
      renderHeaderRight={() => <></>}
    />
  );
};

export default Stacks;
