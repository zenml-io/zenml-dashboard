import React, { useState } from 'react';
import { translate } from './translate';
import { List } from './List';
import { AllRuns } from './AllRuns';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';
import { useService } from './useService';
import { useLocationPath } from '../../../hooks';
import FilterComponent, {
  getInitialFilterStateForPipeline,
  getInitialFilterStateForRuns,
} from '../../../components/Filters';
// import { projectSelectors } from '../../../../redux/selectors/projects';
import { DEFAULT_PROJECT_NAME } from '../../../../constants';

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
  // const selectedProject = useSelector(projectSelectors.selectedProject);
  console.log(setFetchingForAllRuns);
  const locationPath = useLocationPath();

  const url_string = window.location.href; 
  const url = new URL(url_string);
  const projectName = url.searchParams.get("project");
  const project = projectName ? projectName : DEFAULT_PROJECT_NAME

  return (
    <BasePage
      tabPages={[
        window.location.href?.includes('all-runs') ?    {
            text: translate('tabs.allRuns.text'),
            Component: FilterWrapperForRun,
            path: routePaths.pipelines.allRuns(project),
          } : {
            text: translate('tabs.pipelines.text'),
            Component: FilterWrapper,
            path: routePaths.pipelines.base,
            // path: routePaths.pipelines.list(selectedProject),
        }
      ]}
      tabBasePath={routePaths.pipelines.base + `?project=${project}`}
      breadcrumbs={[
        {
          name: locationPath.includes('pipelines')
            ? translate('header.breadcrumbs.pipelines.text')
            : 'Runs',
          clickable: true,
          to: locationPath.includes('pipelines')
          ? routePaths.pipelines.base + `?project=${project}`
          : routePaths.pipelines.allRuns(project) + `?project=${project}`,
          // to: locationPath.includes('pipelines/list')
          //   ? routePaths.pipelines.list(project)
          //   : routePaths.pipelines.allRuns(project),
        },
      ]}
      headerWithButtons
      renderHeaderRight={() => <></>}
    />
  );
};

export default Pipelines;
