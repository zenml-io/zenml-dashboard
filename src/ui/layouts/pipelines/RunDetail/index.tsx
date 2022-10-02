import React from 'react';

import { routePaths } from '../../../../routes/routePaths';
import { translate } from './translate';
import { BasePage } from '../BasePage';
import { useService } from './useService';
// import { Configuration } from '../PipelineDetail/Configuration';
import { Configuration } from '../RunDetail/Configuration';
// import styles from './index.module.scss';
// import { Box, FlexBox, icons, Paragraph, Truncate } from '../../../components';
// import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../constants';
// import { RunTime } from '../RunTime';
// import { KeyValue, RunStatus } from './components';
// import { Results } from './Results';
// import { Statistics } from './Statistics';
// import { Tensorboard } from './Tensorboard';
// import { formatMoney } from '../../../../utils/money';
// import { truncate } from '../../../../utils';

const getTabPages = ({
  pipelineId,
  runId,
}: {
  pipelineId: TId;
  runId: TId;
}): TabPage[] => {
  return [
    {
      text: 'DAG',
      // <Statistics runId={runId} stackId={stackId} />
      Component: () => <div>Coming soon</div>,
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
  const { runId, pipelineId } = useService();
  const tabPages = getTabPages({
    runId,
    pipelineId,
  });
  const breadcrumbs = getBreadcrumbs({
    runId,
    pipelineId,
  });
  // debugger;
  return (
    <BasePage
      tabPages={tabPages}
      tabBasePath={routePaths.run.pipeline.base(runId, pipelineId)}
      breadcrumbs={breadcrumbs}
    >
      {/* <FlexBox marginTop="xxl" padding="lg" className={styles.box}>
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
      </FlexBox> */}
    </BasePage>
  );
};

export default RunDetail;
