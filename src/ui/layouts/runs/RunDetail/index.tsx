import React from 'react';

import { routePaths } from '../../../../routes/routePaths';
// import { translate } from './translate';
import { BasePage } from '../BasePage';
import { Configuration } from './Configuration';
import { DAG } from '../../../components/dag';
import { useService } from './useService';

import { Box, Paragraph } from '../../../components';
// import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../constants';
// import { RunTime } from '../RunTime';
import { RunStatus } from './components';
// import { Results } from './Results';
// import { Tensorboard } from './Tensorboard';
// import { formatMoney } from '../../../../utils/money';
import { formatDateForOverviewBar } from '../../../../utils';
import { useHistory } from '../../../hooks';

const getTabPages = ({
  runId,
  fetching,
}: {
  runId: TId;
  fetching: boolean;
}): TabPage[] => {
  return [
    {
      text: 'DAG',
      // <Statistics runId={runId} stackId={stackId} />
      Component: () => <DAG runId={runId} fetching={fetching} />,
      path: routePaths.run.run.statistics(runId),
    },
    {
      text: 'Configuration',
      // <Results runId={runId} stackId={stackId} />
      Component: () => <Configuration runId={runId} />,
      path: routePaths.run.run.results(runId),
    },
    // {
    //   text: translate('tabs.tensorboard.text'),
    //   Component: () => <Tensorboard runId={runId} stackId={stackId} />,
    //   path: routePaths.run.stack.tensorboard(runId, stackId),
    // },
  ];
};

const getBreadcrumbs = ({ runId }: { runId: TId }): TBreadcrumb[] => {
  return [
    {
      name: 'Runs',
      clickable: true,
      to: routePaths.pipelines.allRuns,
    },

    {
      name: `Run ${runId}`,
      clickable: true,
      to: routePaths.run.run.statistics(runId),
    },
  ];
};

export interface RunDetailRouteParams {
  id: TId;
  runId: TId;
}

export const RunDetail: React.FC = () => {
  const { runId, run, fetching } = useService();
  // const { runId } = useService();

  const tabPages = getTabPages({
    fetching,
    runId,
  });
  const breadcrumbs = getBreadcrumbs({
    runId,
  });

  const boxStyle = {
    backgroundColor: '#E9EAEC',
    padding: '10px 0',
    borderRadius: '8px',
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-around',
  };
  const headStyle = { color: '#828282' };
  const history = useHistory();
  return (
    <BasePage
      tabPages={tabPages}
      tabBasePath={routePaths.run.run.base(runId)}
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
