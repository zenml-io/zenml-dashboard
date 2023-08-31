import React from 'react';

import { routePaths } from '../../../../routes/routePaths';
import { BasePage } from '../BasePage';
import { Configuration } from './Configuration';
import { useService } from './useService';
import { DAG } from '../../../components/dag';

import { Box } from '../../../components';

import { useHistory, useSelector } from '../../../hooks';
import { workspaceSelectors } from '../../../../redux/selectors';
import { Stack } from '../../../../api/types';

import { Table } from '../../common/Table';
import { useHeaderCols } from './HeaderCols';

const getTabPages = ({
  stackId,
  runId,
  fetching,
  selectedWorkspace,
  metadata,
  graph,
  run,
}: {
  stackId: TId;
  runId: TId;
  fetching: boolean;
  selectedWorkspace: string;
  metadata?: any;
  graph?: any;
  run?: any;
}): TabPage[] => {
  return [
    {
      text: 'DAG',

      Component: () => (
        <DAG
          runId={runId}
          fetching={fetching}
          metadata={metadata}
          graph={graph}
          runStatus={run?.status}
        />
      ),
      path: routePaths.run.stack.statistics(selectedWorkspace, runId, stackId),
    },
    {
      text: 'Configuration',

      Component: () => <Configuration runId={runId} />,
      path: routePaths.run.stack.results(selectedWorkspace, runId, stackId),
    },
  ];
};

const getBreadcrumbs = ({
  stackId,
  runId,
  selectedWorkspace,
}: {
  stackId: TId;
  runId: TId;
  selectedWorkspace: string;
}): TBreadcrumb[] => {
  return [
    {
      name: 'Stacks',
      clickable: true,
      to: routePaths.stacks.list(selectedWorkspace),
    },
    {
      name: stackId,
      clickable: true,
      to: routePaths.stack.configuration(stackId, selectedWorkspace),
    },
    {
      name: `Run ${runId}`,
      clickable: true,
      to: routePaths.run.stack.statistics(selectedWorkspace, runId, stackId),
    },
  ];
};

export interface RunDetailRouteParams {
  id: TId;
  stackId: TId;
}

export const RunDetail: React.FC = () => {
  const { runId, stackId, fetching, run, metadata, graph } = useService();
  const history = useHistory();
  const runRow: any = [];
  runRow.push(run);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  const tabPages = getTabPages({
    runId,
    stackId,
    fetching,
    selectedWorkspace,
    metadata,
    graph,
    run,
  });
  const breadcrumbs = getBreadcrumbs({
    runId,
    stackId,
    selectedWorkspace,
  });
  const headerCols = useHeaderCols({
    runs: runRow,
  });
  const openDetailPage = (stack: Stack) => {
    history.push(routePaths.stack.runs(selectedWorkspace, stackId));
  };

  return (
    <BasePage
      headerWithButtons
      tabPages={tabPages}
      tabBasePath={routePaths.run.stack.base(runId, stackId)}
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
