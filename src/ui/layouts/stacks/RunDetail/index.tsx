import React from 'react';

import { routePaths } from '../../../../routes/routePaths';
import { BasePage } from '../BasePage';
import { Configuration } from './Configuration';
import { useService } from './useService';
import { DAG } from '../../../components/dag';

// import { Box, Paragraph } from '../../../components';
// import { RunStatus } from './components';
// import { formatDateToDisplayOnTable } from '../../../../utils';
// import { useHistory } from 'react-router-dom';
import { useHistory, useSelector } from '../../../hooks';
import { workspaceSelectors } from '../../../../redux/selectors';
// import { Runs } from '../StackDetail/Runs';
import { Table } from '../../common/Table';
import { useHeaderCols } from './HeaderCols';

const getTabPages = ({
  stackId,
  runId,
  fetching,
  selectedWorkspace,
  metadata,
}: {
  stackId: TId;
  runId: TId;
  fetching: boolean;
  selectedWorkspace: string;
  metadata?: any;
}): TabPage[] => {
  return [
    {
      text: 'DAG',

      Component: () => (
        <DAG runId={runId} fetching={fetching} metadata={metadata} />
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
      to: routePaths.run.stack.statistics(runId, stackId, selectedWorkspace),
    },
  ];
};

export interface RunDetailRouteParams {
  id: TId;
  stackId: TId;
}

export const RunDetail: React.FC = () => {
  const { runId, stackId, fetching, run, metadata } = useService();
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
  });
  const breadcrumbs = getBreadcrumbs({
    runId,
    stackId,
    selectedWorkspace,
  });
  const headerCols = useHeaderCols({
    runs: runRow,
  });
  const openDetailPage = (stack: TStack) => {
    history.push(routePaths.stack.runs(selectedWorkspace, stackId));
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
  return (
    <BasePage
      tabPages={tabPages}
      tabBasePath={routePaths.run.stack.base(runId, stackId)}
      breadcrumbs={breadcrumbs}
    >
      <Table
        // activeSorting={
        //   activeSortingDirection?.toLowerCase() + ':' + activeSorting
        // } // activeSorting={
        //   activeSorting !== 'created' && activeSortingDirection !== 'ASC'
        //     ? activeSorting
        //     : 'created'
        // }
        // pagination={pagination}
        // loading={fetching}
        // filters={filter}
        // showHeader={true}
        // paginated={paginated}
        headerCols={headerCols}
        tableRows={runRow}
        // emptyState={{ text: emptyStateText }}
        trOnClick={openDetailPage}
      />
      {/* <Runs
        filter={[]}
        pagination={false}
        runId={runId}
        isExpended={true}
        stackId={stackId}
      ></Runs> */}
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
