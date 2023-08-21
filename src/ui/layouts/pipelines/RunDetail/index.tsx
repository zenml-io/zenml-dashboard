import React from 'react';

import { routePaths } from '../../../../routes/routePaths';
import { translate } from './translate';
import { BasePage } from '../BasePage';
import { useService } from './useService';

import { Configuration } from '../RunDetail/Configuration';
import { DAG } from '../../../components/dag';
import { Details } from './Detail';

import { Box } from '../../../components';

import { useHistory, useSelector } from '../../../hooks';
import { workspaceSelectors } from '../../../../redux/selectors';

import { Table } from '../../common/Table';
import { useHeaderCols } from './HeaderCols';

const getTabPages = ({
  selectedWorkspace,
  pipelineId,
  runId,
  fetching,
  metadata,
  graph,
  run,
}: {
  selectedWorkspace: string;
  pipelineId: TId;
  runId: TId;
  fetching: boolean;
  metadata?: any;
  graph?: any;
  run?: any;
}): TabPage[] => {
  return [
    {
      text: 'DAG Visualizer',

      Component: () => (
        <DAG
          runId={runId}
          fetching={fetching}
          metadata={metadata}
          graph={graph}
          runStatus={run?.status}
        />
      ),
      path: routePaths.run.pipeline.statistics(
        selectedWorkspace,
        runId,
        pipelineId,
      ),
    },
    {
      text: 'Configuration',

      Component: () => <Configuration runId={runId} />,
      path: routePaths.run.pipeline.results(
        selectedWorkspace,
        runId,
        pipelineId,
      ),
    },
    {
      text: 'Details',

      Component: () => <Details runId={runId} />,
      path: routePaths.run.pipeline.details(
        selectedWorkspace,
        runId,
        pipelineId,
      ),
    },
  ];
};

const getBreadcrumbs = ({
  selectedWorkspace,
  pipelineId,
  runId,
}: {
  selectedWorkspace: string;
  pipelineId: TId;
  runId: TId;
}): TBreadcrumb[] => {
  return [
    {
      name: translate('header.breadcrumbs.pipelines.text'),
      clickable: true,
      to: routePaths.pipelines.list(selectedWorkspace),
    },
    {
      name: pipelineId,
      clickable: true,
      to: routePaths.pipeline.configuration(pipelineId, selectedWorkspace),
    },
    {
      name: `Run ${runId}`,
      clickable: true,
      to: routePaths.run.pipeline.statistics(
        selectedWorkspace,
        runId,
        pipelineId,
      ),
    },
  ];
};

export interface RunDetailRouteParams {
  id: TId;
  pipelineId: TId;
}

export const RunDetail: React.FC = () => {
  const { runId, pipelineId, fetching, run, metadata, graph } = useService();
  const history = useHistory();
  const runRow: any = [];
  runRow.push(run);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const tabPages = getTabPages({
    selectedWorkspace,
    runId,
    pipelineId,
    fetching,
    metadata,
    graph,
    run,
  });
  const breadcrumbs = getBreadcrumbs({
    runId,
    pipelineId,
    selectedWorkspace,
  });
  const headerCols = useHeaderCols({
    runs: runRow,
  });
  const openDetailPage = (stack: TStack) => {
    history.push(routePaths.pipeline.runs(selectedWorkspace, pipelineId));
  };

  return (
    <BasePage
      headerWithButtons
      tabPages={tabPages}
      tabBasePath={routePaths.run.pipeline.base(runId, pipelineId)}
      breadcrumbs={breadcrumbs}
    >
      <Box marginTop="lg">
        <Table
          pagination={false}
          headerCols={headerCols}
          tableRows={runRow}
          trOnClick={openDetailPage}
        />
      </Box>
    </BasePage>
  );
};

export default RunDetail;
