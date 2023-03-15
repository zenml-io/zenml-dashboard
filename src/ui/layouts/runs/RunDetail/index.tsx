import React from 'react';

import { routePaths } from '../../../../routes/routePaths';

import { BasePage } from '../BasePage';
import { Configuration } from './Configuration';
import { DAG } from '../../../components/dag';
import { useService } from './useService';

// import { Box, Paragraph } from '../../../components';

// import { RunStatus } from './components';

// import { formatDateToDisplayOnTable } from '../../../../utils';

// Muhammad Ali Zia DAG Visualizer line: 32
import { useSelector } from '../../../hooks';
import { workspaceSelectors } from '../../../../redux/selectors';
import { Runs } from '../../pipelines/PipelineDetail/Runs';

const getTabPages = ({
  selectedWorkspace,
  runId,
  fetching,
}: {
  selectedWorkspace: string;
  runId: TId;
  fetching: boolean;
}): TabPage[] => {
  return [
    {
      text: 'DAG Visualizer',

      Component: () => <DAG runId={runId} fetching={fetching} />,
      path: routePaths.run.run.statistics(selectedWorkspace, runId),
    },
    {
      text: 'Configuration',

      Component: () => <Configuration runId={runId} />,
      path: routePaths.run.run.results(selectedWorkspace, runId),
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
  const { runId, fetching } = useService();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const tabPages = getTabPages({
    selectedWorkspace,
    fetching,
    runId,
  });
  const breadcrumbs = getBreadcrumbs({
    runId,
    selectedWorkspace,
  });

  // const boxStyle = {
  //   backgroundColor: '#E9EAEC',
  //   padding: '10px 0',
  //   borderRadius: '8px',
  //   marginTop: '20px',
  //   display: 'flex',
  //   justifyContent: 'space-around',
  // };
  // const headStyle = { color: '#828282' };
  // const history = useHistory();
  return (
    <BasePage
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
