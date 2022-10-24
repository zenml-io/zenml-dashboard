import React, { useState } from 'react';
// import { translate } from './translate';
import { List } from './List';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';

import { useService } from './useService';
import { useLocationPath } from '../../../hooks';

import FilterComponent, {
  getInitialFilterState,
} from '../../../components/Filters';
import { camelCaseToParagraph } from '../../../../utils';

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
  const { setFetching } = useService();
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
      renderHeaderRight={() => <></>}
    />
  );
};

export default Stacks;
