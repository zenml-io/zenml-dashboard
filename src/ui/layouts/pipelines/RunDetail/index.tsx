import React from 'react';

import { routePaths } from '../../../../routes/routePaths';
import { translate } from './translate';
import { BasePage } from '../BasePage';
import { useService } from './useService';
// import { Configuration } from '../PipelineDetail/Configuration';
import { Configuration } from '../RunDetail/Configuration';
import { DAG } from '../../../components/dag';
// import styles from './index.module.scss';
import { Box, Paragraph } from '../../../components';
// import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../constants';
// import { RunTime } from '../RunTime';
import { RunStatus } from './components';

// import { formatMoney } from '../../../../utils/money';
import { formatDateForOverviewBar } from '../../../../utils';
import { useHistory } from '../../../hooks';

const getTabPages = ({
  pipelineId,
  runId,
  fetching,
}: {
  pipelineId: TId;
  runId: TId;
  fetching: boolean;
}): TabPage[] => {
  return [
    {
      text: 'DAG',
      // <Statistics runId={runId} stackId={stackId} />
      Component: () => <DAG runId={runId} fetching={fetching} />,
      path: routePaths.run.pipeline.statistics(runId, pipelineId),
    },
    {
      text: 'Configuration',
      // <Results runId={runId} stackId={stackId} />
      Component: () => <Configuration runId={runId} />,
      path: routePaths.run.pipeline.results(runId, pipelineId),
    },
    // {
    //   text: translate('tabs.statistics.text'),
    //   Component: () => <Statistics runId={runId} pipelineId={pipelineId} />,
    //   path: routePaths.run.pipeline.statistics(runId, pipelineId),
    // },
    // {
    //   text: translate('tabs.results.text'),
    //   Component: () => <Results runId={runId} pipelineId={pipelineId} />,
    //   path: routePaths.run.pipeline.results(runId, pipelineId),
    // },
    // {
    //   text: translate('tabs.tensorboard.text'),
    //   Component: () => <Tensorboard runId={runId} pipelineId={pipelineId} />,
    //   path: routePaths.run.pipeline.tensorboard(runId, pipelineId),
    // },
  ];
};

const getBreadcrumbs = ({
  pipelineId,
  runId,
}: {
  pipelineId: TId;
  runId: TId;
}): TBreadcrumb[] => {
  return [
    {
      name: translate('header.breadcrumbs.pipelines.text'),
      clickable: true,
      to: routePaths.pipelines.list,
    },
    {
      name: pipelineId,
      clickable: true,
      to: routePaths.pipeline.configuration(pipelineId),
    },
    {
      name: `Run ${runId}`,
      clickable: true,
      to: routePaths.run.pipeline.statistics(runId, pipelineId),
    },
  ];
};

export interface RunDetailRouteParams {
  id: TId;
  pipelineId: TId;
}

export const RunDetail: React.FC = () => {
  // const { runId, pipelineId, run, billing } = useService();
  const { runId, pipelineId, run, fetching } = useService();
  const tabPages = getTabPages({
    runId,
    pipelineId,
    fetching,
  });
  const breadcrumbs = getBreadcrumbs({
    runId,
    pipelineId,
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
      tabBasePath={routePaths.run.pipeline.base(runId, pipelineId)}
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
