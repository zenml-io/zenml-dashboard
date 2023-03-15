import React, { useState } from 'react';

import { routePaths } from '../../../../routes/routePaths';
import { Box } from '../../../components';
// import { iconColors, iconSizes } from '../../../../constants';
import { camelCaseToParagraph } from '../../../../utils';
// import styles from './index.module.scss';
// import cn from 'classnames';
import { translate } from './translate';
import { Configuration } from './Configuration';
import { Runs } from './Runs';
import { BasePage } from '../BasePage';
import { useService } from './useService';
import { useLocationPath, useSelector } from '../../../hooks';
import FilterComponent, {
  getInitialFilterState,
  getInitialFilterStateForRuns,
} from '../../../components/Filters';
import { workspaceSelectors } from '../../../../redux/selectors';
import { List as StackComponenList } from '../Stacks/List';
import { List } from '../../stacks/Stacks/List';

const FilterWrapperForRun = () => {
  const locationPath = useLocationPath();

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
      <Runs
        filter={getFilter(filters)}
        stackComponentId={locationPath.split('/')[5]}
      />
    </FilterComponent>
  );
};

const FilterWrapperForStacks = () => {
  const locationPath = useLocationPath();

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
      <List
        stackComponentId={locationPath.split('/')[5]}
        filter={getFilter(filters)}
      />
    </FilterComponent>
  );
};
const getTabPages = (
  stackId: TId,
  locationPath: any,
  selectedWorkspace: string,
): TabPage[] => {
  return [
    {
      text: translate('tabs.configuration.text'),
      Component: () => <Configuration stackId={stackId} />,
      path: routePaths.stackComponents.configuration(
        locationPath.split('/')[4],
        stackId,
        selectedWorkspace,
      ),
    },
    {
      text: translate('tabs.runs.text'),
      Component: FilterWrapperForRun,
      path: routePaths.stackComponents.runs(
        locationPath.split('/')[4],
        stackId,
        selectedWorkspace,
      ),
    },
    {
      text: 'Stacks',
      Component: FilterWrapperForStacks,
      path: routePaths.stackComponents.stacks(
        locationPath.split('/')[4],
        stackId,
        selectedWorkspace,
      ),
    },
  ];
};

const getBreadcrumbs = (
  stackId: TId,
  locationPath: any,
  selectedWorkspace: string,
): TBreadcrumb[] => {
  console.log({stackId, locationPath, selectedWorkspace})
  return [
    {
      name: camelCaseToParagraph(locationPath.split('/')[4]),

      clickable: true,
      to: routePaths.stackComponents.base(
        locationPath.split('/')[4],
        selectedWorkspace,
      ),
    },
    {
      name: stackId,
      clickable: true,
      to: routePaths.stackComponents.configuration(
        camelCaseToParagraph(locationPath.split('/')[4]),
        stackId,
        selectedWorkspace,
      ),
    },
  ];
};

export interface StackDetailRouteParams {
  id: TId;
}

export const StackDetail: React.FC = () => {
  const locationPath = useLocationPath();
  const { stackComponent, id } = useService();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const tabPages = getTabPages(id, locationPath, selectedWorkspace);
  const breadcrumbs = getBreadcrumbs(id, locationPath, selectedWorkspace);

  // const boxStyle = {
  //   backgroundColor: '#E9EAEC',
  //   padding: '10px 0',
  //   borderRadius: '8px',
  //   marginTop: '20px',
  //   display: 'flex',
  //   justifyContent: 'space-around',
  // };
  // const headStyle = { color: '#828282' };
  // const paraStyle = { color: '#515151', marginTop: '10px' };
  // const data = [
  //   { name: 'Anom', age: 19, gender: 'Male' },
  //   { name: 'Megha', age: 19, gender: 'Female' },
  //   { name: 'Subham', age: 25, gender: 'Male' },
  // ];
  // const history = useHistory();

  return (
<></>
  );
};

export default StackDetail;
