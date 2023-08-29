import React, { useState } from 'react';

import { routePaths } from '../../../../routes/routePaths';
import { translate } from './translate';
import { Configuration } from './Configuration';

import { Runs } from './Runs';
import { BasePage } from '../BasePage';
import { useService } from './useService';
import { useHistory, useLocationPath, useSelector } from '../../../hooks';
import FilterComponent, {
  getInitialFilterStateForRuns,
} from '../../../components/Filters';
import { Box } from '../../../components';
import { workspaceSelectors } from '../../../../redux/selectors';
import { DEFAULT_WORKSPACE_NAME } from '../../../../constants';

import { GetFlavorsListForLogo } from '../../stackComponents/Stacks/List/GetFlavorsListForLogo';
import { FullWidthSpinner } from '../../../components';
import { CollapseTable } from '../../common/CollapseTable';
import { GetHeaderCols } from './getHeaderCols';
import { Stack, StackComponent, Flavor } from '../../../../api/types';

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
  history?: any,
): TabPage[] => {
  return [
    {
      text: translate('tabs.configuration.text'),
      Component: () => (
        <Configuration fetching={fetching} tiles={tiles} stackId={stackId} />
      ),
      path: routePaths.stack.configuration(stackId, selectedWorkspace),
    },
    {
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
  const { flavourList, fetching } = GetFlavorsListForLogo();

  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  if (Object.keys(stack).length === 0) {
    return <FullWidthSpinner color="black" size="md" />;
  }
  if (flavourList?.length > 1) {
    for (const [key] of Object.entries(
      stack.components as Record<string, StackComponent[]>,
    )) {
      const { logo_url }: any = flavourList.find(
        (fl: Flavor) =>
          fl.name ===
            (stack.components as Record<string, StackComponent[]>)[key][0]
              ?.flavor &&
          fl.type ===
            (stack.components as Record<string, StackComponent[]>)[key][0]
              ?.type,
      );

      nestedRowtiles.push({
        ...((stack.components as Record<string, StackComponent[]>)[
          key
        ][0] as StackComponent),
        type: key,
        name: (stack.components as Record<string, StackComponent[]>)[key][0]
          ?.name,
        id: (stack.components as Record<string, StackComponent[]>)[key][0]?.id,
        logo: logo_url,
      });
    }
  }

  const tabPages = getTabPages(
    stack.id,
    fetching,
    selectedWorkspace,
    nestedRowtiles,
    history,
  );
  const breadcrumbs = getBreadcrumbs(stack.id, selectedWorkspace);
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
      tabBasePath={routePaths.stack.base(stack.id)}
      breadcrumbs={breadcrumbs}
      title="Stacks"
    >
      <Box marginTop="lg" style={{ overflowX: 'auto' }}>
        <CollapseTable
          pagination={false}
          renderAfterRow={(stack: Stack) => <></>}
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
