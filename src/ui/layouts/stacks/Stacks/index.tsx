import React, { useState } from 'react';
import { translate } from './translate';
import { List } from './List';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';

import { useService } from './useService';

import FilterComponent, {
  getInitialFilterState,
} from '../../../components/Filters';
// import { useSelector } from '../../../hooks';
// import { projectSelectors } from '../../../../redux/selectors';
import { DEFAULT_PROJECT_NAME } from '../../../../constants';


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
  // const selectedProject = useSelector(projectSelectors.selectedProject);
 
  const url_string = window.location.href; 
  const url = new URL(url_string);
  const projectName = url.searchParams.get("project");
  const project = projectName ? projectName : DEFAULT_PROJECT_NAME
 
  return (
    <BasePage
      tabPages={[
        {
          text: translate('tabs.stacks.text'),
          Component: FilterWrapper,
          path: routePaths.stacks.base,
          // path: routePaths.stacks.list(selectedProject),
        },
      ]}
      tabBasePath={routePaths.stacks.base + `?project=${project}`}
      breadcrumbs={[
        {
          name: translate('header.breadcrumbs.stacks.text'),
          clickable: true,
          to: routePaths.stacks.base  + `?project=${project}`,
          // to: routePaths.stacks.list(selectedProject),
        },
      ]}
      headerWithButtons
      renderHeaderRight={() => <></>}
    />
  );
};

export default Stacks;
