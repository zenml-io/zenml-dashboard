import React, { useState } from 'react';
import { translate } from './translate';
import { List } from './List';

import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';
import { useService } from './useService';
import { useSelector, useLocationPath } from '../../../hooks';
import FilterComponent from '../../../components/Filters';
import { Box } from '../../../components';
import { workspaceSelectors } from '../../../../redux/selectors/workspaces';
import {
  getInitialFilterStateForPipeline,
  searchParamConstants,
} from './filterParamConstants';

const FilterWrapper = () => {
  // TODO: Dev please note: getInitialFilterState is for stack inital filter value for any other component you need to modify it
  const [filters, setFilter] = useState([getInitialFilterStateForPipeline()]);
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
    <Box marginTop="lg" style={{ marginTop: '-20px', width: '100%' }}>
      <FilterComponent
        searchColumns={searchParamConstants}
        getInitials={getInitialFilterStateForPipeline}
        filters={filters}
        setFilter={setFilter}
      >
        <List filter={getFilter(filters)} />
      </FilterComponent>
    </Box>
  );
};

export const Pipelines: React.FC = () => {
  useService();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  const locationPath = useLocationPath();

  return (
    <>
      <BasePage
        tabPages={[
          {
            text: translate('tabs.pipelines.text'),
            Component: FilterWrapper,

            path: routePaths.pipelines.list(
              selectedWorkspace
                ? selectedWorkspace
                : locationPath.split('/')[2],
            ),
          },
        ]}
        tabBasePath={routePaths.pipelines.base}
        breadcrumbs={[]}
        title={'Pipelines'}
        headerWithButtons
        renderHeaderRight={() => <></>}
      />
    </>
  );
};

export default Pipelines;
