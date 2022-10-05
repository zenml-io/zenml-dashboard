import React from 'react';

import { routePaths } from '../../../../routes/routePaths';
// import { translate } from './translate';
import { BasePage } from '../BasePage';
import { Configuration } from './Configuration';
import { DAG } from './DAG';
import { useService } from './useService';

// import styles from './index.module.scss';
import { Box, Paragraph } from '../../../components';
// import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../constants';
// import { RunTime } from '../RunTime';
import { RunStatus } from './components';
// import { Results } from './Results';
// import { Statistics } from './Statistics';
// import { Tensorboard } from './Tensorboard';
// import { formatMoney } from '../../../../utils/money';
import { formatDateToDisplay } from '../../../../utils';

const getTabPages = ({
  stackId,
  runId,
}: {
  stackId: TId;
  runId: TId;
}): TabPage[] => {
  return [
    {
      text: 'DAG',
      // <Statistics runId={runId} stackId={stackId} />
      Component: () => <DAG runId={runId} />,
      path: routePaths.run.stack.statistics(runId, stackId),
    },
    {
      text: 'Configuration',
      // <Results runId={runId} stackId={stackId} />
      Component: () => <Configuration runId={runId} />,
      path: routePaths.run.stack.results(runId, stackId),
    },
    // {
    //   text: translate('tabs.tensorboard.text'),
    //   Component: () => <Tensorboard runId={runId} stackId={stackId} />,
    //   path: routePaths.run.stack.tensorboard(runId, stackId),
    // },
  ];
};

const getBreadcrumbs = ({
  stackId,
  runId,
}: {
  stackId: TId;
  runId: TId;
}): TBreadcrumb[] => {
  return [
    {
      name: 'Stacks',
      clickable: true,
      to: routePaths.stacks.list,
    },
    {
      name: stackId,
      clickable: true,
      to: routePaths.stack.configuration(stackId),
    },
    {
      name: `Run ${runId}`,
      clickable: true,
      to: routePaths.run.stack.statistics(runId, stackId),
    },
  ];
};

export interface RunDetailRouteParams {
  id: TId;
  stackId: TId;
}

export const RunDetail: React.FC = () => {
  // const { runId, stackId } = useService();
  const { runId, stackId, run } = useService();
  const tabPages = getTabPages({
    runId,
    stackId,
  });
  const breadcrumbs = getBreadcrumbs({
    runId,
    stackId,
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
  return (
    <BasePage
      tabPages={tabPages}
      tabBasePath={routePaths.run.stack.base(runId, stackId)}
      breadcrumbs={breadcrumbs}
    >
      <Box style={boxStyle}>
        <Box>
          <Paragraph style={headStyle}>RUN ID</Paragraph>
          <Paragraph
            style={{ color: '#515151', marginTop: '10px', fontWeight: 'bold' }}
          >
            {run.id}
          </Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>RUN NAME</Paragraph>
          <Paragraph
            style={{ color: '#515151', marginTop: '10px', fontWeight: 'bold' }}
          >
            {run.name}
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
          <Paragraph style={headStyle}>AUTHOR</Paragraph>
          <Paragraph
            style={{ color: '#515151', marginTop: '10px', fontWeight: 'bold' }}
          >
            {run.user.name}
          </Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>CREATED AT</Paragraph>
          <Paragraph
            style={{ color: '#515151', marginTop: '10px', fontWeight: 'bold' }}
          >
            {formatDateToDisplay(run.created)}
          </Paragraph>
        </Box>
      </Box>
    </BasePage>
  );
};

export default RunDetail;
