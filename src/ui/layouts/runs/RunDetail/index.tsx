import React from 'react';
import { routePaths } from '../../../../routes/routePaths';
import { BasePage } from '../BasePage';
import { Configuration } from './Configuration';
import { DAG } from '../../../components/dag';
import { useService } from './useService';
import { Runs } from '../../pipelines/PipelineDetail/Runs';
import { useHistory, useSelector } from '../../../hooks';
import { workspaceSelectors } from '../../../../redux/selectors';
import { useHeaderCols } from './HeaderCols';
import { Details } from './Detail'

const getTabPages = ({
  selectedWorkspace,
  runId,
  fetching,
  metadata,
}: {
  selectedWorkspace: string;
  runId: TId;
  fetching: boolean;
  metadata?: any;
}): TabPage[] => {
  return [
    {
      text: 'DAG Visualizer',

      Component: () => (
        <DAG runId={runId} fetching={fetching} metadata={metadata} />
      ),
      path: routePaths.run.run.statistics(selectedWorkspace, runId),
    },
    {
      text: 'Configuration',

      Component: () => <Configuration runId={runId} />,
      path: routePaths.run.run.results(selectedWorkspace, runId),
    },
    {
      text: 'Details',
      Component: () => <Details runId={runId} />,
      path: routePaths.run.run.details(selectedWorkspace, runId),
    },
  ];
};

const getBreadcrumbs = ({
  runId,
  selectedWorkspace,
}: {
  runId: TId;
  selectedWorkspace: string;
}): TBreadcrumb[] => {
  return [
    {
      name: 'Runs',
      clickable: true,
      to: routePaths.pipelines.allRuns(selectedWorkspace),
    },

    {
      name: `Run ${runId}`,
      clickable: true,
      to: routePaths.run.run.statistics(selectedWorkspace, runId),
    },
  ];
};

export interface RunDetailRouteParams {
  id: TId;
  runId: TId;
}

export const RunDetail: React.FC = () => {
  const { runId, fetching, run, metadata } = useService();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const tabPages = getTabPages({
    selectedWorkspace,
    fetching,
    runId,
    metadata,
  });
  const history = useHistory();
  const runRow: any = [];
  runRow.push(run);
  const breadcrumbs = getBreadcrumbs({
    runId,
    selectedWorkspace,
  });
  const openDetailPage = (stack: TStack) => {// eslint-disable-line
    history.push(routePaths.pipelines.allRuns(selectedWorkspace));
  };
  const headerCols = useHeaderCols({   // eslint-disable-line
    runs: runRow,
  });
  return (
    <BasePage
      headerWithButtons
      tabPages={tabPages}
      tabBasePath={routePaths.run.run.base(runId)}
      breadcrumbs={breadcrumbs}
    >
      <Runs
        isExpended
        filter={[]}
        pagination={false}
        runId={runId}
        fromAllruns={true}
        pipelineId={runId}
      ></Runs>
    </BasePage>
  );
};

export default RunDetail;
