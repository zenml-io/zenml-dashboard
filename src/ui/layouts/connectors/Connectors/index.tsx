import React, { useState } from 'react';
import { translate } from './translate';
import { List } from './List';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';

import { useService } from './useService';

import FilterComponent, {
  getInitialFilterStateForConnectors,
} from '../../../components/Filters';
import { Box } from '../../../components';
import { workspaceSelectors } from '../../../../redux/selectors';
import { useLocationPath, useSelector } from '../../../hooks';
// import { useSelector } from '../../../hooks';
// import { workspaceSelectors } from '../../../../redux/selectors';

const FilterWrapper = () => {
  // TODO: Dev please note: getInitialFilterState is for stack inital filter value for any other component you need to modify it
  const [filters, setFilter] = useState([getInitialFilterStateForConnectors()]);
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
    <Box style={{ marginTop: '-20px', width: '100%' }}>
      <FilterComponent
        getInitials={getInitialFilterStateForConnectors}
        filters={filters}
        setFilter={setFilter}
      >
        <List filter={getFilter(filters)} />
      </FilterComponent>
    </Box>
  );
};

export const Stacks: React.FC = () => {
  // eslint-disable-next-line no-empty-pattern
  const {} = useService();

  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const locationPath = useLocationPath();
  return (
    <BasePage
      tabPages={[
        {
          text: translate('tabs.connectors.text'),
          Component: FilterWrapper,
          // path: routePaths.connectors.base,
          path: routePaths.connectors.list(
            selectedWorkspace ? selectedWorkspace : locationPath.split('/')[2],
          ),
        },
      ]}
      tabBasePath={routePaths.connectors.base}
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
      title="Connectors"
      headerWithButtons
      renderHeaderRight={() => <></>}
    />
  );
};

export default Stacks;
