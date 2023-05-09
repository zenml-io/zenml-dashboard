import React from 'react';
import { routePaths } from '../../../../routes/routePaths';
import { BasePage } from '../BasePage';
import { Configuration } from './Configuration';
import { DAG } from '../../../components/dag';
import { useService } from './useService';
// import { Runs } from '../../pipelines/PipelineDetail/Runs';
import { useHistory, useSelector } from '../../../hooks';
import { workspaceSelectors } from '../../../../redux/selectors';
import { useHeaderCols } from './HeaderCols';
import { Details } from './Detail';
import { Box } from '../../../components';
import { Table } from '../../common/Table';

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
  const openDetailPage = (stack: TStack) => {
    // eslint-disable-line
    history.push(routePaths.pipelines.allRuns(selectedWorkspace));
  };
  const headerCols = useHeaderCols({
    // eslint-disable-line
    runs: runRow,
  });
  return (
    <BasePage
      headerWithButtons
      tabPages={tabPages}
      tabBasePath={routePaths.run.run.base(runId)}
      breadcrumbs={breadcrumbs}
    >
      <Box marginTop="lg">
        <Table
          pagination={false}
          headerCols={headerCols}
          tableRows={runRow}
          // emptyState={{ text: emptyStateText }}
          trOnClick={openDetailPage}
        />
      </Box>
      {/* <Box style={boxStyle}>
        <Box>
          <Paragraph style={headStyle}>RUN ID</Paragraph>
          <Paragraph style={{ color: '#515151', marginTop: '10px' }}>
            {run.id}
          </Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>RUN NAME</Paragraph>
          <Paragraph style={{ color: '#515151', marginTop: '10px' }}>
            {run.name}
          </Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>PIPELINE NAME</Paragraph>
          <Paragraph
            size="small"
            style={{
              color: '#22BBDD',
              textDecoration: 'underline',
              cursor: 'pointer',
              marginTop: '10px',
            }}
            onClick={(event) => {
              event.stopPropagation();
              history.push(
                routePaths.pipeline.configuration(
                  run.pipeline?.id,
                  selectedWorkspace,
                ),
              );
            }}
          >
            {run.pipeline?.name}
          </Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>STATUS</Paragraph>
          <Paragraph
            style={{
              marginTop: '10px',
              justifyContent: 'center',
              borderRadius: '50%',
              height: '25px',
              width: '25px',
              paddingTop: '3px',
              textAlign: 'center',
            }}
          >
            <RunStatus run={run} />
          </Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>STACK NAME</Paragraph>
          <Paragraph
            size="small"
            style={{
              color: '#22BBDD',
              textDecoration: 'underline',
              cursor: 'pointer',
              marginTop: '10px',
            }}
            onClick={(event) => {
              event.stopPropagation();
              history.push(
                routePaths.stack.configuration(run.stack?.id, selectedWorkspace),
              );
            }}
          >
            {run.stack?.name}
          </Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>AUTHOR</Paragraph>
          <Paragraph style={{ color: '#515151', marginTop: '10px' }}>
            {run?.user?.name}
          </Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>CREATED</Paragraph>
          <Paragraph style={{ color: '#515151', marginTop: '10px' }}>
            {formatDateToDisplayOnTable(run.created)}
          </Paragraph>
        </Box>
      </Box> */}
    </BasePage>
  );
};

export default RunDetail;
