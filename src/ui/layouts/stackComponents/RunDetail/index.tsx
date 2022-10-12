import React from 'react';

import { routePaths } from '../../../../routes/routePaths';
import {
  camelCaseToParagraph,
  formatDateForOverviewBar,
} from '../../../../utils';
import { useHistory, useLocationPath } from '../../../hooks';
// import { translate } from './translate';
import { BasePage } from '../BasePage';
import { Configuration } from './Configuration';
import { DAG } from '../../../components/dag';
import { useService } from './useService';

// import styles from './index.module.scss';
import { Box, Paragraph } from '../../../components';
// import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../constants';
// import { RunTime } from '../RunTime';
import { RunStatus } from './components';

// const getTabPages = ({
//   stackId,
//   runId,
// }: {
//   stackId: TId;
//   runId: TId;
// }): TabPage[] => {
//   const locationPath = useLocationPath();
//   return [
//     {
//       text: 'DAG',
//       // <Statistics runId={runId} stackId={stackId} />
//       Component: () => <div>Coming soon</div>,
//       path: routePaths.run.component.statistics('alerter', runId, stackId),
//     },
//     {
//       text: 'Configuration',
//       // <Results runId={runId} stackId={stackId} />
//       Component: () => <Configuration runId={runId} />,
//       path: routePaths.run.component.results(runId, stackId),
//     },
//   ];
// };

// const getBreadcrumbs = ({
//   stackId,
//   runId,
// }: {
//   stackId: TId;
//   runId: TId;
// }): TBreadcrumb[] => {
//   return [
//     {
//       name: 'Component',
//       clickable: true,
//       to: routePaths.stackComponents.base('alerter'),
//     },
//     {
//       name: 'alerteaaar',
//       clickable: true,
//       to: routePaths.stackComponents.base('alerter'),
//     },
//     {
//       name: `Run ${runId}`,
//       clickable: true,
//       to: routePaths.run.component.statistics('alerter', runId, stackId),
//     },
//   ];
// };

export interface RunDetailRouteParams {
  type: string;
  stackComponentId: TId;
  id: TId;
}

export const RunDetail: React.FC = () => {
  const locationPath = useLocationPath();
  const history = useHistory();
  const { stackComponentId, runId, run, fetching } = useService();
  // debugger;
  // debugger;
  // const { runId, stackId, run, billing } = useService();
  // debugger;
  const tabPages = [
    {
      text: 'DAG',
      // <Statistics runId={runId} stackId={stackId} />
      Component: () => <DAG runId={runId} fetching={fetching} />,
      path: routePaths.run.component.statistics(
        locationPath.split('/')[2],
        stackComponentId,
        runId,
      ),
    },
    {
      text: 'Configuration',
      // <Results runId={runId} stackId={stackId} />
      Component: () => <Configuration runId={runId} />,
      path: routePaths.run.component.results(
        locationPath.split('/')[2],
        stackComponentId,
        runId,
      ),
    },
  ];
  const breadcrumbs = [
    {
      name: camelCaseToParagraph(locationPath.split('/')[2]),
      clickable: true,
      to: routePaths.stackComponents.base(locationPath.split('/')[2]),
    },
    {
      name: stackComponentId,
      clickable: true,
      to: routePaths.stackComponents.configuration(
        locationPath.split('/')[2],
        stackComponentId,
      ),
    },
    {
      name: `Run ${runId}`,
      clickable: false,
      to: routePaths.run.component.statistics(
        locationPath.split('/')[3],
        stackComponentId,

        runId,
      ),
    },
  ];
  const boxStyle = {
    backgroundColor: '#E9EAEC',
    padding: '10px 0',
    borderRadius: '8px',
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-around',
  };
  const headStyle = { color: '#828282' };

  return (
    <BasePage
      tabPages={tabPages}
      tabBasePath={routePaths.run.component.base(runId, stackComponentId)}
      breadcrumbs={breadcrumbs}
    >
      <Box style={boxStyle}>
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
              history.push(routePaths.pipeline.configuration(run.pipeline?.id));
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
              history.push(routePaths.stack.configuration(run.stack?.id));
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
          <Paragraph style={headStyle}>CREATED AT</Paragraph>
          <Paragraph style={{ color: '#515151', marginTop: '10px' }}>
            {formatDateForOverviewBar(run.created)}
          </Paragraph>
        </Box>
      </Box>
    </BasePage>
  );
};

export default RunDetail;
