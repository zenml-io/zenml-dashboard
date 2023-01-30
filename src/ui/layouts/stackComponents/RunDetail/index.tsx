import React from 'react';

import { routePaths } from '../../../../routes/routePaths';
import {
  camelCaseToParagraph,
  // formatDateToDisplayOnTable,
} from '../../../../utils';
import { useLocationPath, useSelector } from '../../../hooks';

import { BasePage } from '../BasePage';
import { Configuration } from './Configuration';
import { DAG } from '../../../components/dag';
import { useService } from './useService';

// import { Box, Paragraph } from '../../../components';

// import { RunStatus } from './components';
import { projectSelectors } from '../../../../redux/selectors';
import { Runs } from '../StackDetail/Runs';

export interface RunDetailRouteParams {
  type: string;
  stackComponentId: TId;
  id: TId;
}

export const RunDetail: React.FC = () => {
  const locationPath = useLocationPath();
  // const history = useHistory();
  const { stackComponentId, runId, fetching } = useService();
  const selectedProject = useSelector(projectSelectors.selectedProject);
  const tabPages = [
    {
      text: 'DAG',

      Component: () => <DAG runId={runId} fetching={fetching} />,
      path: routePaths.run.component.statistics(
        locationPath.split('/')[4],
        stackComponentId,
        runId,
        selectedProject,
      ),
    },
    {
      text: 'Configuration',

      Component: () => <Configuration runId={runId} />,
      path: routePaths.run.component.results(
        locationPath.split('/')[4],
        stackComponentId,
        runId,
        selectedProject,
      ),
    },
  ];
  const breadcrumbs = [
    {
      name: camelCaseToParagraph(locationPath.split('/')[4]),
      clickable: true,
      to: routePaths.stackComponents.base(
        locationPath.split('/')[4],
        selectedProject,
      ),
    },
    {
      name: stackComponentId,
      clickable: true,
      to: routePaths.stackComponents.configuration(
        locationPath.split('/')[4],
        stackComponentId,
        selectedProject,
      ),
    },
    {
      name: `Run ${runId}`,
      clickable: false,
      to: routePaths.run.component.statistics(
        locationPath.split('/')[5],
        stackComponentId,
        runId,
        selectedProject,
      ),
    },
  ];
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
      tabBasePath={routePaths.run.component.base(runId, stackComponentId)}
      breadcrumbs={breadcrumbs}
    >
      <Runs
        filter={[]}
        pagination={false}
        runId={runId}
        // isExpended
        stackComponentId={stackComponentId}
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
