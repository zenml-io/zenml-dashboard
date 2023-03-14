import React from 'react';

import { routePaths } from '../../../../routes/routePaths';
import { translate } from './translate';
import { BasePage } from '../BasePage';
import { useService } from './useService';

import { Configuration } from '../RunDetail/Configuration';
import { DAG } from '../../../components/dag';

// import { Box, Paragraph } from '../../../components';

// import { RunStatus } from './components';

// import { formatDateToDisplayOnTable } from '../../../../utils';
import { useHistory, useSelector } from '../../../hooks';
import { workspaceSelectors } from '../../../../redux/selectors';
// import { Runs } from '../PipelineDetail/Runs';
import { Table } from '../../common/Table';
import { useHeaderCols } from './HeaderCols';

const getTabPages = ({
  selectedWorkspace,
  pipelineId,
  runId,
  fetching,
  metadata,
}: {
  selectedWorkspace: string;
  pipelineId: TId;
  runId: TId;
  fetching: boolean;
  metadata?: any;
}): TabPage[] => {
  return [
    {
      text: 'DAG',

      Component: () => (
        <DAG runId={runId} fetching={fetching} metadata={metadata} />
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
  const { runId, pipelineId, fetching, run, metadata } = useService();
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
      headerWithButtons
      tabPages={tabPages}
      tabBasePath={routePaths.run.pipeline.base(runId, pipelineId)}
      breadcrumbs={breadcrumbs}
    >
      <Table
        pagination={false}
        headerCols={headerCols}
        tableRows={runRow}
        // emptyState={{ text: emptyStateText }}
        trOnClick={openDetailPage}
      />
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
