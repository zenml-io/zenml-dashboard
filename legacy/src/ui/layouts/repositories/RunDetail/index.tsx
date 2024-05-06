import React from 'react';

import { routePaths } from '../../../../routes/routePaths';
import { BasePage } from '../repository-layout';
import { useService } from './useService';

import { Configuration } from '../../runs/RunDetail/Configuration';
import { DAG } from '../../../components/dag';
import { Details } from '../../runs/RunDetail/Detail';

import { Box } from '../../../components';

import { useHistory, useSelector } from '../../../hooks';
import { workspaceSelectors } from '../../../../redux/selectors';

import { Table } from '../../common/Table';
import { useHeaderCols } from '../../runs/RunDetail/HeaderCols';

const getTabPages = ({
  selectedWorkspace,
  repositoryID,
  runId,
  fetching,
  metadata,
  graph,
  run,
}: {
  selectedWorkspace: string;
  repositoryID: TId;
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
      path: routePaths.run.repository.statistics(
        selectedWorkspace,
        runId,
        repositoryID,
      ),
    },
    {
      text: 'Configuration',
      Component: () => <Configuration runId={runId} />,
      path: routePaths.run.repository.results(
        selectedWorkspace,
        runId,
        repositoryID,
      ),
    },
    {
      text: 'Details',
      Component: () => <Details runId={runId} />,
      path: routePaths.run.repository.details(
        selectedWorkspace,
        runId,
        repositoryID,
      ),
    },
  ];
};

const getBreadcrumbs = ({
  selectedWorkspace,
  repositoryID,
  runId,
}: {
  selectedWorkspace: string;
  repositoryID: TId;
  runId: TId;
}): TBreadcrumb[] => {
  return [
    {
      name: 'Repositories',
      clickable: true,
      to: routePaths.repositories.list(selectedWorkspace),
    },
    {
      name: repositoryID,
      clickable: true,
      to: routePaths.repositories.overview(repositoryID, selectedWorkspace),
    },
    {
      name: `Run ${runId}`,
      clickable: true,
      to: routePaths.run.repository.statistics(
        selectedWorkspace,
        runId,
        repositoryID,
      ),
    },
  ];
};

export interface RunDetailRouteParams {
  id: TId;
  repositoryID: TId;
}

export const RunDetail: React.FC = () => {
  const { runId, repositoryID, fetching, run, metadata, graph } = useService();
  const history = useHistory();
  const runRow: any = [];
  runRow.push(run);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const tabPages = getTabPages({
    selectedWorkspace,
    runId,
    repositoryID,
    fetching,
    metadata,
    graph,
    run,
  });
  const breadcrumbs = getBreadcrumbs({
    runId,
    repositoryID,
    selectedWorkspace,
  });
  const headerCols = useHeaderCols({
    runs: runRow,
  });
  const openDetailPage = (stack: TStack) => {
    history.push(routePaths.repositories.runs(selectedWorkspace, repositoryID));
  };

  return (
    <BasePage
      headerWithButtons
      tabPages={tabPages}
      tabBasePath={routePaths.run.repository.base(runId, repositoryID)}
      breadcrumbs={breadcrumbs}
      title="Runs"
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
