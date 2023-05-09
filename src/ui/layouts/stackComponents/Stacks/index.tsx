import React, { useEffect, useState } from 'react';
// import { translate } from './translate';
import { List } from './List';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';

import { useService } from './useService';
import { useLocation, useLocationPath, useSelector } from '../../../hooks';

import FilterComponent, {
  getInitialFilterState,
} from '../../../components/Filters';
import { camelCaseToParagraph } from '../../../../utils';
// import { workspaceSelectors } from '../../../../redux/selectors';
import { DEFAULT_WORKSPACE_NAME } from '../../../../constants';
import { workspaceSelectors } from '../../../../redux/selectors';

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
  const location: any = useLocation();
  useEffect(() => {
    const tempFilter = filters.map((item: any) => {
      return {
        ...item,
        column: {
          ...item.column,
          selectedValue: { value: 'flavor', label: 'Flavor', type: 'string' },
        },
        contains: {
          ...item.contains,
          selectedValue: { value: 'equals', label: 'Equal', type: 'string' },
        },
        filterValue: location.state?.state,
      };
    });
    setFilter(tempFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('getfilter', filters);
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
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  // const url_string = window.location.href;
  // const url = new URL(url_string);
  // const workspaceName = url.pathname.split('/')[2];

  const workspace = selectedWorkspace
    ? selectedWorkspace
    : DEFAULT_WORKSPACE_NAME;
  // debugger;
  return (
    <BasePage
      tabPages={[
        {
          text: camelCaseToParagraph(locationPath.split('/')[4]),
          Component: FilterWrapper,
          path: routePaths.stackComponents.base(
            locationPath.split('/')[4],
            selectedWorkspace
              ? selectedWorkspace
              : (locationPath.split('/')[2] as string),
          ),
        },
      ]}
      // tabBasePath={
      //   routePaths.stackComponents.base('', workspace) + `?workspace=${workspace}`
      // }
      tabBasePath={
        routePaths.stackComponents.base(
          locationPath.split('/')[4],
          selectedWorkspace
            ? selectedWorkspace
            : (locationPath.split('/')[2] as string),
        ) + `?workspace=${workspace}`
      }
      breadcrumbs={
        [
          // {
          //   name: camelCaseToParagraph(locationPath.split('/')[4]),
          //   clickable: true,
          //   to:
          //     routePaths.stackComponents.base(
          //       locationPath.split('/')[4],
          //       workspace as string,
          //     ) + `?workspace=${workspace}`,
          // },
        ]
      }
      title="Stack Components"
      headerWithButtons
      renderHeaderRight={() => <></>}
    />
  );
};

export default Stacks;
