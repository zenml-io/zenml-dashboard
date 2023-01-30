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
import { useSelector } from '../../../hooks';
import { projectSelectors } from '../../../../redux/selectors';
import { Runs } from '../StackDetail/Runs';

const getTabPages = ({
  stackId,
  runId,
  fetching,
  selectedProject,
}: {
  stackId: TId;
  runId: TId;
  fetching: boolean;
  selectedProject: string;
}): TabPage[] => {
  return [
    {
      text: 'DAG',

      Component: () => <DAG runId={runId} fetching={fetching} />,
      path: routePaths.run.stack.statistics(selectedProject, runId, stackId),
    },
    {
      text: 'Configuration',

      Component: () => <Configuration runId={runId} />,
      path: routePaths.run.stack.results(selectedProject, runId, stackId),
    },
  ];
};

const getBreadcrumbs = ({
  stackId,
  runId,
  selectedProject,
}: {
  stackId: TId;
  runId: TId;
  selectedProject: string;
}): TBreadcrumb[] => {
  return [
    {
      name: 'Stacks',
      clickable: true,
      to: routePaths.stacks.list(selectedProject),
    },
    {
      name: stackId,
      clickable: true,
      to: routePaths.stack.configuration(stackId, selectedProject),
    },
    {
      name: `Run ${runId}`,
      clickable: true,
      to: routePaths.run.stack.statistics(runId, stackId, selectedProject),
    },
  ];
};

export interface RunDetailRouteParams {
  id: TId;
  stackId: TId;
}

export const RunDetail: React.FC = () => {
  const { runId, stackId, fetching } = useService();
  // const history = useHistory();
  const selectedProject = useSelector(projectSelectors.selectedProject);

  const tabPages = getTabPages({
    runId,
    stackId,
    fetching,
    selectedProject,
  });
  const breadcrumbs = getBreadcrumbs({
    runId,
    stackId,
    selectedProject,
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
  return (
    <BasePage
      tabPages={tabPages}
      tabBasePath={routePaths.run.stack.base(runId, stackId)}
      breadcrumbs={breadcrumbs}
    >
      <Runs
        filter={[]}
        pagination={false}
        runId={runId}
        isExpended
        stackId={stackId}
      ></Runs>
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
                  selectedProject,
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
                routePaths.stack.configuration(run.stack?.id, selectedProject),
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
