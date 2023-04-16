import React, { useState } from 'react';
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
import { Box } from '../../../components';
import { workspaceSelectors } from '../../../../redux/selectors/workspaces';

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
    <Box marginTop='lg' style={{ marginTop: '-20px', width: '100%' }}>
      <FilterComponent
        getInitials={getInitialFilterStateForPipeline}
        filters={filters}
        setFilter={setFilter}
      > 
        <List filter={getFilter(filters)} />
      </FilterComponent>
    </Box>
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
    <Box style={{ marginTop: '-20px', width: '100%' }}>
      <FilterComponent
        getInitials={getInitialFilterStateForRuns}
        filters={filters}
        setFilter={setFilter}
      >
        <AllRuns filter={getFilter(filters)} />
      </FilterComponent>
    </Box>
  );
};

export const Pipelines: React.FC = () => {
  const { setFetchingForAllRuns } = useService();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  console.log('a', setFetchingForAllRuns);
  const locationPath = useLocationPath();

  return (
    <>
      <BasePage
        tabPages={[
          window.location.href?.includes('all-runs')
            ? {
              text: translate('tabs.allRuns.text'),
              Component: FilterWrapperForRun,
              path: routePaths.pipelines.allRuns(
                selectedWorkspace
                  ? selectedWorkspace
                  : locationPath.split('/')[2],
              ),
            }
            : {
              text: translate('tabs.pipelines.text'),
              Component: FilterWrapper,
              // path: routePaths.pipelines.base,
              path: routePaths.pipelines.list(
                selectedWorkspace
                  ? selectedWorkspace
                  : locationPath.split('/')[2],
              ),
            },
        ]}
        tabBasePath={routePaths.pipelines.base}
        breadcrumbs={
          [
            // {
            //   name: locationPath.includes('all-runs')
            //     ? 'Runs'
            //     : translate('header.breadcrumbs.pipelines.text'),
            //   clickable: true,
            //   // to: locationPath.includes('pipelines')
            //   // ? routePaths.pipelines.base
            //   // : routePaths.pipelines.allRuns(selectedWorkspace),
            //   to: locationPath.includes('pipelines/list')
            //     ? routePaths.pipelines.list(
            //         selectedWorkspace
            //           ? selectedWorkspace
            //           : locationPath.split('/')[2],
            //       )
            //     : routePaths.pipelines.allRuns(
            //         selectedWorkspace
            //           ? selectedWorkspace
            //           : locationPath.split('/')[2],
            //       ),
            // },
          ]
        }
        title={locationPath.includes('all-runs') ? 'Runs' : 'Pipelines'}
        headerWithButtons
        renderHeaderRight={() => <></>}
      />
    </>
  );
};

export default Pipelines;
