import React, { useState } from 'react';
import { translate } from './translate';

import { List } from './List';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';
import { useService } from './useService';
import { useSelector, useLocationPath } from '../../../hooks';
import FilterComponent, {
  getInitialFilterStateForRuns,
} from '../../../components/Filters';
import { Box } from '../../../components';
import { workspaceSelectors } from '../../../../redux/selectors/workspaces';

const FilterWrapperForRun = () => {
  // TODO: Dev please note: getInitialFilterState is for stack inital filter value for any other component you need to modify it
  const [filters, setFilter] = useState([getInitialFilterStateForRuns()]);
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
        getInitials={getInitialFilterStateForRuns}
        filters={filters}
        setFilter={setFilter}
      >
        <List filter={getFilter(filters)} />
      </FilterComponent>
    </Box>
  );
};

export const Runs: React.FC = () => {
  useService();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  const locationPath = useLocationPath();

  return (
    <>
      <BasePage
        tabPages={[
          {
            text: translate('tabs.allRuns.text'),
            Component: FilterWrapperForRun,
            path: routePaths.run.run.list(
              selectedWorkspace
                ? selectedWorkspace
                : locationPath.split('/')[2],
            ),
          },
        ]}
        tabBasePath={routePaths.run.run.list(
          selectedWorkspace ? selectedWorkspace : locationPath.split('/')[2],
        )}
        breadcrumbs={[]}
        title={'Runs'}
        headerWithButtons
        renderHeaderRight={() => <></>}
      />
    </>
  );
};

export default Runs;
