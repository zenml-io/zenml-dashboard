import React, { useState } from 'react';
import { translate } from './translate';
import { List } from './List';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';

import { useService } from './useService';

import FilterComponent from '../../../components/Filters';
import { Box } from '../../../components';
import { workspaceSelectors } from '../../../../redux/selectors';
import { useLocationPath, useSelector } from '../../../hooks';
import {
  getInitialFilterStateForSecrets,
  searchParamConstants,
} from './filterParamConstants';

const FilterWrapper = () => {
  // TODO: Dev please note: getInitialFilterState is for stack inital filter value for any other component you need to modify it
  const [filters, setFilter] = useState([getInitialFilterStateForSecrets()]);
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
        searchColumns={searchParamConstants}
        getInitials={getInitialFilterStateForSecrets}
        filters={filters}
        setFilter={setFilter}
      >
        <List filter={getFilter(filters)} />
      </FilterComponent>
    </Box>
  );
};

export const Stacks: React.FC = () => {
  useService();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const locationPath = useLocationPath();
  return (
    <BasePage
      tabPages={[
        {
          text: translate('tabs.secrets.text'),
          Component: FilterWrapper,

          path: routePaths.secrets.list(
            selectedWorkspace ? selectedWorkspace : locationPath.split('/')[2],
          ),
        },
      ]}
      tabBasePath={routePaths.secrets.base}
      breadcrumbs={[]}
      title="Secrets"
      headerWithButtons
      renderHeaderRight={() => <></>}
    />
  );
};

export default Stacks;
