import _ from 'lodash';
import React from 'react';
import cn from 'classnames';

import styles from '../index.module.scss';
import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../../constants';
import { translate } from '../translate';
import { formatDateToDisplay, truncate } from '../../../../../utils';
import {
  FlexBox,
  Paragraph,
  LinkBox,
  Box,
  icons,
} from '../../../../components';
import { HeaderCol } from '../../../common/Table';
import { RunStatus } from '../RunStatus';
import { RunTime } from '../../RunTime';
import { RunUser } from '../RunUser';
import { SortingHeader } from '../SortingHeader';
import { Sorting, SortingDirection } from '../types';
import { useService } from './useService';
import { PipelineName } from '../PipelineName';

export const useHeaderCols = ({
  runs,
  setRuns,
  activeSorting,
  activeSortingDirection,
  setActiveSortingDirection,
  setActiveSorting,
}: {
  runs: TRun[];
  setRuns: (runs: TRun[]) => void;
  activeSorting: Sorting | null;
  activeSortingDirection: SortingDirection | null;
  setActiveSortingDirection: (direction: SortingDirection | null) => void;
  setActiveSorting: (sorting: Sorting | null) => void;
}): HeaderCol[] => {
  const {
    toggleSelectRun,
    isRunSelected,
    selectRuns,
    unselectRuns,
    allRunsSelected,
    sortMethod,
  } = useService({
    setActiveSortingDirection,
    setActiveSorting,
    setRuns,
    activeSorting,
    activeSortingDirection,
    runs,
  });

  return [
    {
      render: () => (
        <FlexBox justifyContent="center">
          <Paragraph size="small" color="grey">
            <LinkBox
              onClick={() => {
                if (allRunsSelected(runs)) {
                  unselectRuns(runs);
                } else {
                  selectRuns(runs);
                }
              }}
              className={cn(
                styles.checkbox,
                allRunsSelected(runs) && styles.checkedCheckbox,
              )}
            />
          </Paragraph>
        </FlexBox>
      ),
      width: '3%',
      renderRow: (run: TRun) => (
        <FlexBox justifyContent="center">
          <LinkBox
            onClick={(e: Event) => {
              e.stopPropagation();
              toggleSelectRun(run);
            }}
            className={cn(
              styles.checkbox,
              isRunSelected(run) && styles.checkedCheckbox,
            )}
          />
        </FlexBox>
      ),
    },
    {
      render: () => (
        <SortingHeader
          sorting="id"
          sortMethod={sortMethod('id', {
            asc: (runs: TRun[]) => _.orderBy(runs, ['id'], ['asc']),
            desc: (runs: TRun[]) => _.orderBy(runs, ['id'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="grey">
            {translate('runId.text')}
          </Paragraph>
        </SortingHeader>
      ),
      width: '10%',
      renderRow: (run: TRun) => (
        <Paragraph size="small">{truncate(run.id, ID_MAX_LENGTH)}</Paragraph>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="grey">
          {translate('pipelineName.text')}
        </Paragraph>
      ),
      width: '10%',
      renderRow: (run: TRun) => <PipelineName run={run} />,
    },
    {
      render: () => (
        <SortingHeader
          sorting="pipelineRunType"
          sortMethod={sortMethod('pipelineRunType', {
            asc: (runs: TRun[]) =>
              _.orderBy(runs, ['pipelineRunType'], ['asc']),
            desc: (runs: TRun[]) =>
              _.orderBy(runs, ['pipelineRunType'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="grey">
            {translate('type.text')}
          </Paragraph>
        </SortingHeader>
      ),
      width: '8%',
      renderRow: (run: TRun) => (
        <Paragraph size="small">{run.pipelineRunType}</Paragraph>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="grey">
          {translate('runtime.text')}
        </Paragraph>
      ),
      width: '8%',
      renderRow: (run: TRun) => <RunTime run={run} />,
    },
    {
      render: () => (
        <SortingHeader
          sorting="status"
          sortMethod={sortMethod('status', {
            asc: (runs: TRun[]) => _.orderBy(runs, ['status'], ['asc']),
            desc: (runs: TRun[]) => _.orderBy(runs, ['status'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="grey">
            {translate('status.text')}
          </Paragraph>
        </SortingHeader>
      ),
      width: '13%',
      renderRow: (run: TRun) => <RunStatus run={run} />,
    },
    {
      render: () => (
        <SortingHeader
          sorting="datasourceCommit"
          sortMethod={sortMethod('datasourceCommit', {
            asc: (runs: TRun[]) =>
              _.orderBy(runs, ['datasourceCommitId'], ['asc']),
            desc: (runs: TRun[]) =>
              _.orderBy(runs, ['datasourceCommitId'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="grey">
            {translate('datasourceCommit.text')}
          </Paragraph>
        </SortingHeader>
      ),
      width: '20%',
      renderRow: (run: TRun) => (
        <Paragraph size="small">
          {truncate(run.datasourceCommitId, ID_MAX_LENGTH)}
        </Paragraph>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="grey">
          {translate('author.text')}
        </Paragraph>
      ),
      width: '15%',
      renderRow: (run: TRun) => <RunUser run={run} />,
    },
    {
      render: () => (
        <SortingHeader
          sorting="createdAt"
          sortMethod={sortMethod('createdAt', {
            asc: (runs: TRun[]) =>
              _.orderBy(
                runs,
                (run: TRun) => new Date(run.kubeflowStartTime).getTime(),
                ['asc'],
              ),
            desc: (runs: TRun[]) =>
              _.orderBy(
                runs,
                (run: TRun) => new Date(run.kubeflowStartTime).getTime(),
                ['desc'],
              ),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="grey">
            {translate('createdAt.text')}
          </Paragraph>
        </SortingHeader>
      ),
      width: '10%',
      renderRow: (run: TRun) => (
        <FlexBox alignItems="center">
          <Box paddingRight="sm">
            <icons.calendar color={iconColors.grey} size={iconSizes.sm} />
          </Box>
          <Paragraph color="grey" size="tiny">
            {formatDateToDisplay(run.kubeflowStartTime)}
          </Paragraph>
        </FlexBox>
      ),
    },
  ];
};
