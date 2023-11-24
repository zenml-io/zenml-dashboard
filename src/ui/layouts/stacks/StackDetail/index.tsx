import React, { useState } from 'react';

import { routePaths } from '../../../../routes/routePaths';
import { translate } from './translate';
import { Configuration } from './Configuration';

import { Runs } from './Runs';
import { BasePage } from '../BasePage';
import { useService } from './useService';
import { useHistory, useLocationPath, useSelector } from '../../../hooks';
import FilterComponent from '../../../components/Filters';
import { Box } from '../../../components';
import { workspaceSelectors } from '../../../../redux/selectors';
import { DEFAULT_WORKSPACE_NAME } from '../../../../constants';

import { GetFlavorsListForLogo } from '../../stackComponents/Stacks/List/GetFlavorsListForLogo';
import { FullWidthSpinner } from '../../../components';
import { CollapseTable } from '../../common/CollapseTable';
import { GetHeaderCols } from './getHeaderCols';
import { Stack, StackComponent, Flavor } from '../../../../api/types';
import {
  getInitialFilterStateForRuns,
  searchParamConstants,
} from '../../AllRuns/Runs/filterParamConstants';

const FilterWrapperForRun = () => {
  const locationPath = useLocationPath();

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
    <Box marginTop="lg" style={{ width: '100%' }}>
      <FilterComponent
        searchColumns={searchParamConstants}
        getInitials={getInitialFilterStateForRuns}
        filters={filters}
        setFilter={setFilter}
      >
        <Runs
          filter={getFilter(filters)}
          stackId={locationPath.split('/')[4]}
        />
      </FilterComponent>
    </Box>
  );
};

const getTabPages = (
  stackId: TId,
  fetching: boolean,
  selectedWorkspace: string,
  tiles?: any,
  ifPermissionDenied?: boolean,
  disabledNestedRowtiles?: any,
): TabPage[] => {
  return [
    {
      text: translate('tabs.configuration.text'),
      Component: () => (
        <Configuration
          ifPermissionDenied={ifPermissionDenied}
          fetching={fetching}
          tiles={tiles}
          disabledNestedRowtiles={disabledNestedRowtiles}
          stackId={stackId}
        />
      ),
      path: routePaths.stack.configuration(stackId, selectedWorkspace),
    },
    {
      testId: 'run_tab',
      text: translate('tabs.runs.text'),
      Component: FilterWrapperForRun,
      path: routePaths.stack.runs(selectedWorkspace, stackId),
    },
  ];
};

const url_string = window.location.href;
const url = new URL(url_string);
const workspaceName = url.searchParams.get('workspace');
const workspace = workspaceName ? workspaceName : DEFAULT_WORKSPACE_NAME;

const getBreadcrumbs = (
  stackId: TId,
  selectedWorkspace: string,
): TBreadcrumb[] => {
  return [
    {
      name: translate('header.breadcrumbs.stacks.text'),
      clickable: true,
      to: routePaths.stacks.base + `?workspace=${workspace}`,
    },
    {
      name: stackId,
      clickable: true,
      to: routePaths.stack.configuration(stackId, selectedWorkspace),
    },
  ];
};

export interface StackDetailRouteParams {
  id: TId;
}

export const StackDetail: React.FC = () => {
  const { stack } = useService();
  const filteredStacks: any = [];
  filteredStacks.push(stack);
  const history = useHistory();
  const nestedRowtiles = [];
  const disabledNestedRowtiles = [];
  const { flavourList, fetching } = GetFlavorsListForLogo();

  function checkPermissionDenied(data: any) {
    if (!data || typeof data !== 'object') {
      return false; // Handle the case where data is not an object or is undefined/null
    }

    const keys = Object.keys(data);

    return keys
      .flatMap((key) => data[key])
      .some((item) => item && item.permission_denied); // Check if any item has permission_denied set to true
  }

  let ifPermissionDenied: boolean = false;

  if (flavourList?.length > 1) {
    const components = stack?.metadata?.components as any;
    if (stack?.metadata === null) {
      ifPermissionDenied = true;
    } else {
      ifPermissionDenied = checkPermissionDenied(components);
    }
  }

  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  if (stack && Object.keys(stack).length === 0) {
    return <FullWidthSpinner color="black" size="md" />;
  }

  if (flavourList?.length > 1) {
    const components = stack?.metadata?.components as Record<
      string,
      StackComponent[]
    >; // Ensure components exist

    if (components) {
      for (const [key, value] of Object.entries(components)) {
        if (value && value[0]?.body?.flavor && value[0]?.body?.type) {
          const { body }: any = flavourList.find(
            (fl: Flavor) =>
              fl.name === value[0].body?.flavor &&
              fl.body?.type === value[0].body?.type,
          );

          if (body && value[0]) {
            nestedRowtiles.push({
              ...(value[0] as StackComponent),
              type: key,
              name: value[0]?.name,
              id: value[0]?.id,
              logo: body.logo_url,
            });
          }
        } else if (value && value[0]?.permission_denied) {
          disabledNestedRowtiles.push({
            ...(value[0] as StackComponent),
            type: key,
            name: value[0]?.name,
            id: value[0]?.id,
          });
        }
      }
    }
  }

  const tabPages = getTabPages(
    stack?.id,
    fetching,
    selectedWorkspace,
    nestedRowtiles,
    ifPermissionDenied,
    disabledNestedRowtiles,
  );
  const breadcrumbs = getBreadcrumbs(stack?.id, selectedWorkspace);
  const headerCols = GetHeaderCols({
    filteredStacks,
  });

  const openDetailPage = (stack: Stack) => {
    history.push(routePaths.stacks.list(selectedWorkspace));
  };
  return (
    <BasePage
      headerWithButtons
      tabPages={tabPages}
      tabBasePath={routePaths.stack.base(stack?.id)}
      breadcrumbs={breadcrumbs}
      title="Stacks"
    >
      <Box marginTop="lg" style={{ overflowX: 'auto' }}>
        <CollapseTable
          pagination={false}
          renderAfterRow={() => <></>}
          headerCols={headerCols}
          tableRows={filteredStacks}
          emptyState={{ text: translate('emptyState.text') }}
          trOnClick={openDetailPage}
        />
      </Box>
    </BasePage>
  );
};

export default StackDetail;
