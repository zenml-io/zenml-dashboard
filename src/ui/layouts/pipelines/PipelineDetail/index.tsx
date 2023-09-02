import React, { useState } from 'react';

import { routePaths } from '../../../../routes/routePaths';
import { translate } from './translate';
import { Configuration } from './Configuration';
import { Runs } from './Runs';
import { BasePage } from '../BasePage';
import { useService } from './useService';
import FilterComponent, {
  getInitialFilterStateForRuns,
} from '../../../components/Filters';
import { Box } from '../../../components';
import { useHistory, useLocationPath, useSelector } from '../../../hooks';
import { workspaceSelectors } from '../../../../redux/selectors';
import { DEFAULT_WORKSPACE_NAME } from '../../../../constants';
import { CollapseTable } from '../../common/CollapseTable';
import { GetHeaderCols } from './getHeaderCols';

interface Props {
  pipelineId: TId;
}
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
    <Box marginTop="lg" style={{ width: '100%' }}>
      <FilterComponent
        getInitials={getInitialFilterStateForRuns}
        filters={filters}
        setFilter={setFilter}
      >
        <Runs
          filter={getFilter(filters)}
          pipelineId={locationPath.split('/')[4]}
        />
      </FilterComponent>
    </Box>
  );
};

const FilterWrapperForConfiguration = () => {
  // TODO: Dev please note: getInitialFilterState is for stack inital filter value for any other component you need to modify it
  const [filters, setFilter] = useState([getInitialFilterStateForRuns()]);
  return (
    <Box style={{ width: '100%' }}>
      <FilterComponent
        getInitials={getInitialFilterStateForRuns}
        filters={filters}
        setFilter={setFilter}
      ></FilterComponent>
    </Box>
  );
};

const getTabPages = (pipelineId: TId, selectedWorkspace: string): TabPage[] => {
  return [
    {
      text: translate('tabs.runs.text'),
      Component: FilterWrapperForRun,
      path: routePaths.pipeline.runs(selectedWorkspace, pipelineId),
    },
    {
      text: translate('tabs.configuration.text'),
      Component: () => <Configuration pipelineId={pipelineId} />,
      path: routePaths.pipeline.configuration(pipelineId, selectedWorkspace),
    },
  ];
};

const url_string = window.location.href;
const url = new URL(url_string);
const workspaceName = url.searchParams.get('workspace');

const getBreadcrumbs = (
  pipelineId: TId,
  selectedWorkspace: string,
): TBreadcrumb[] => {
  return [
    {
      name: translate('header.breadcrumbs.pipelines.text'),
      clickable: true,

      to:
        routePaths.pipelines.base +
        `?workspace=${workspaceName ? workspaceName : DEFAULT_WORKSPACE_NAME}`,
    },
    {
      name: pipelineId,
      clickable: true,
      to: routePaths.pipeline.configuration(pipelineId, selectedWorkspace),
    },
  ];
};

export interface PipelineDetailRouteParams {
  id: TId;
}

export const PipelineDetail: React.FC = () => {
  const { pipeline } = useService();
  const filteredPipeline: any = [];
  filteredPipeline.push(pipeline);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const tabPages = getTabPages(pipeline.id, selectedWorkspace);
  const breadcrumbs = getBreadcrumbs(pipeline.id, selectedWorkspace);
  const history = useHistory();
  const locationPath = useLocationPath();

  const headerCols = GetHeaderCols({
    filteredPipeline,
  } as any);
  const openDetailPage = (stack: TStack) => {
    history.push(routePaths.pipelines.list(selectedWorkspace));
  };
  return (
    <BasePage
      title="Pipelines"
      headerWithButtons
      tabPages={tabPages}
      tabBasePath={routePaths.pipeline.base(pipeline.id)}
      breadcrumbs={breadcrumbs}
    >
      <Box marginTop="lg">
        {locationPath.includes('configuration') && (
          <FilterWrapperForConfiguration />
        )}
        <Box style={{ overflowX: 'auto' }}>
          <CollapseTable
            pagination={false}
            renderAfterRow={(stack: TStack) => <></>}
            headerCols={headerCols}
            tableRows={filteredPipeline}
            emptyState={{ text: translate('emptyState.text') }}
            trOnClick={openDetailPage}
          />
        </Box>
      </Box>
    </BasePage>
  );
};

export default PipelineDetail;
