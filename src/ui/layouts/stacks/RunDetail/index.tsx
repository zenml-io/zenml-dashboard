import React, { useEffect } from 'react';

import { routePaths } from '../../../../routes/routePaths';
import { translate } from './translate';
import { BasePage } from '../BasePage';
import { useService } from './useService';

import styles from './index.module.scss';
import { Box, FlexBox, icons, Paragraph, Truncate } from '../../../components';
import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../constants';
import { RunTime } from '../RunTime';
import { KeyValue, RunStatus } from './components';
// import { Results } from './Results';
import { Statistics } from './Statistics';
// import { Tensorboard } from './Tensorboard';
import { formatMoney } from '../../../../utils/money';
import { truncate } from '../../../../utils';

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
      Component: () => <Statistics runId={runId} stackId={stackId} />,
      path: routePaths.run.stack.statistics(runId, stackId),
    },
    {
      text: 'Configuration',
      // <Results runId={runId} stackId={stackId} />
      Component: () => <div>Coming soon</div>,
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
  const { runId, stackId, run, billing } = useService();

  const tabPages = getTabPages({
    runId,
    stackId,
  });
  const breadcrumbs = getBreadcrumbs({
    runId,
    stackId,
  });

  return (
    <BasePage
      tabPages={tabPages}
      tabBasePath={routePaths.run.stack.base(runId, stackId)}
      breadcrumbs={breadcrumbs}
    >
      <FlexBox marginTop="xxl" padding="lg" className={styles.box}>
        <KeyValue width="10%" label={translate('box.runId.text')}>
          <Truncate maxLines={1}>
            <Paragraph size="small">
              {truncate(run.id, ID_MAX_LENGTH)}
            </Paragraph>
          </Truncate>
        </KeyValue>
        <KeyValue width="10%" label={translate('box.status.text')}>
          <RunStatus run={run} />
        </KeyValue>
        <KeyValue width="10%" label={translate('box.runtime.text')}>
          <FlexBox alignItems="center">
            <Box marginRight="sm">
              <icons.clock color={iconColors.black} size={iconSizes.sm} />
            </Box>
            <RunTime run={run} />
          </FlexBox>
        </KeyValue>
        <KeyValue width="10%" label={translate('box.type.text')}>
          <Truncate maxLines={1}>
            <Paragraph size="small">{run.pipelineRunType}</Paragraph>
          </Truncate>
        </KeyValue>
        <KeyValue width="15%" label={translate('box.datasourceCommit.text')}>
          <Truncate maxLines={1}>
            <Paragraph size="small">
              {truncate(run.datasourceCommitId, ID_MAX_LENGTH)}
            </Paragraph>
          </Truncate>
        </KeyValue>
        <KeyValue width="15%" label={translate('box.computeCost.text')}>
          <Truncate maxLines={1}>
            <Paragraph size="small">
              {formatMoney(billing.computeCost)}
            </Paragraph>
          </Truncate>
        </KeyValue>
        <KeyValue width="15%" label={translate('box.trainingCost.text')}>
          <Truncate maxLines={1}>
            <Paragraph size="small">
              {formatMoney(billing.trainingCost)}
            </Paragraph>
          </Truncate>
        </KeyValue>
        <KeyValue width="15%" label={translate('box.totalCost.text')}>
          <Truncate maxLines={1}>
            <Paragraph size="small">
              {formatMoney(billing.trainingCost + billing.computeCost)}
            </Paragraph>
          </Truncate>
        </KeyValue>
      </FlexBox>
    </BasePage>
  );
};

export default RunDetail;
