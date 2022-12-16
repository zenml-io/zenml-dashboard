import React, { useEffect, useState } from 'react';
import { translate } from './translate';
import { List } from './List';
import { AllRuns } from './AllRuns';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';
import { useService } from './useService';
import { useSelector, useLocationPath } from '../../../hooks';
import FilterComponent, {
  getInitialFilterStateForPipeline,
  getInitialFilterStateForRuns,
} from '../../../components/Filters';
import { projectSelectors } from '../../../../redux/selectors/projects';

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
    <FilterComponent
      getInitials={getInitialFilterStateForPipeline}
      filters={filters}
      setFilter={setFilter}
    >
      <List filter={getFilter(filters)} />
    </FilterComponent>
  );
};
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
    <FilterComponent
      getInitials={getInitialFilterStateForRuns}
      filters={filters}
      setFilter={setFilter}
    >
      <AllRuns filter={getFilter(filters)} />
    </FilterComponent>
  );
};

export const Pipelines: React.FC = () => {
  const { setFetchingForAllRuns } = useService();
  const selectedProject = useSelector(projectSelectors.selectedProject);
  console.log(setFetchingForAllRuns);
  const locationPath = useLocationPath();

  return (
    <BasePage
      tabPages={[
        window.location.href?.includes('all-runs')
          ? {
              text: translate('tabs.allRuns.text'),
              Component: FilterWrapperForRun,
              path: routePaths.pipelines.allRuns(
                selectedProject ? selectedProject : locationPath.split('/')[2],
              ),
            }
          : {
              text: translate('tabs.pipelines.text'),
              Component: FilterWrapper,
              // path: routePaths.pipelines.base,
              path: routePaths.pipelines.list(
                selectedProject ? selectedProject : locationPath.split('/')[2],
              ),
            },
      ]}
      tabBasePath={routePaths.pipelines.base}
      breadcrumbs={[
        {
          name: locationPath.includes('all-runs')
            ? 'Runs'
            : translate('header.breadcrumbs.pipelines.text'),
          clickable: true,
          // to: locationPath.includes('pipelines')
          // ? routePaths.pipelines.base
          // : routePaths.pipelines.allRuns(selectedProject),
          to: locationPath.includes('pipelines/list')
            ? routePaths.pipelines.list(
                selectedProject ? selectedProject : locationPath.split('/')[2],
              )
            : routePaths.pipelines.allRuns(
                selectedProject ? selectedProject : locationPath.split('/')[2],
              ),
        },
      ]}
      headerWithButtons
      renderHeaderRight={() => <></>}
    />
  );
};

export default Pipelines;
