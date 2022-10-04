import React from 'react';

import { routePaths } from '../../../../routes/routePaths';
import { camelCaseToParagraph } from '../../../../utils';
import { useLocationPath } from '../../../hooks';
// import { translate } from './translate';
import { BasePage } from '../BasePage';
import { Configuration } from './Configuration';
import { DAG } from './DAG';
import { useService } from './useService';

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
  const { type, stackComponentId, runId } = useService();
  // debugger;
  // debugger;
  // const { runId, stackId, run, billing } = useService();
  // debugger;
  const tabPages = [
    {
      text: 'DAG',
      // <Statistics runId={runId} stackId={stackId} />
      Component: () => <DAG runId={runId} />,
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

  return (
    <BasePage
      tabPages={tabPages}
      tabBasePath={routePaths.run.component.base(runId, stackComponentId)}
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
