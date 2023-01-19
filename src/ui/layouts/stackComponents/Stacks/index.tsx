import React, { useState } from 'react';
// import { translate } from './translate';
import { List } from './List';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';

import { useService } from './useService';
import { useLocationPath, useSelector } from '../../../hooks';

import FilterComponent, {
  getInitialFilterState,
} from '../../../components/Filters';
import { camelCaseToParagraph } from '../../../../utils';
// import { projectSelectors } from '../../../../redux/selectors';
import { DEFAULT_PROJECT_NAME } from '../../../../constants';
import { projectSelectors } from '../../../../redux/selectors';

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
  const selectedProject = useSelector(projectSelectors.selectedProject);

  // const url_string = window.location.href;
  // const url = new URL(url_string);
  // const projectName = url.pathname.split('/')[2];

  const project = selectedProject ? selectedProject : DEFAULT_PROJECT_NAME;
  // debugger;
  return (
    <BasePage
      tabPages={[
        {
          text: camelCaseToParagraph(locationPath.split('/')[4]),
          Component: FilterWrapper,
          path: routePaths.stackComponents.base(
            locationPath.split('/')[4],
            selectedProject
              ? selectedProject
              : (locationPath.split('/')[2] as string),
          ),
        },
      ]}
      // tabBasePath={
      //   routePaths.stackComponents.base('', project) + `?project=${project}`
      // }
      tabBasePath={
        routePaths.stackComponents.base(
          locationPath.split('/')[4],
          selectedProject
            ? selectedProject
            : (locationPath.split('/')[2] as string),
        ) + `?project=${project}`
      }
      breadcrumbs={[
        {
          name: camelCaseToParagraph(locationPath.split('/')[4]),
          clickable: true,
          to:
            routePaths.stackComponents.base(
              locationPath.split('/')[4],
              project as string,
            ) + `?project=${project}`,
        },
      ]}
      headerWithButtons
      renderHeaderRight={() => <></>}
    />
  );
};

export default Stacks;
