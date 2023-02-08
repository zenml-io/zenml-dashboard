import _ from 'lodash';
import React from 'react';

import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../../constants';

import { truncate, formatDateToDisplayOnTable } from '../../../../../utils';

import { FlexBox, Paragraph, Box, icons } from '../../../../components';
import { HeaderCol } from '../../../common/Table';
import { RunStatus } from '../RunStatus';

import { SortingHeader } from '../SortingHeader';

import { Sorting, SortingDirection } from '../types';
import { useService } from './useService';
import ReactTooltip from 'react-tooltip';

export const useHeaderCols = ({
  expendedRow,
  runs,
  setRuns,
  activeSorting,
  activeSortingDirection,
  setActiveSortingDirection,
  setActiveSorting,
}: {
  expendedRow?: any;
  runs: TRun[];
  setRuns: (runs: TRun[]) => void;
  activeSorting: Sorting | null;
  activeSortingDirection: SortingDirection | null;
  setActiveSortingDirection: (direction: SortingDirection | null) => void;
  setActiveSorting: (sorting: Sorting | null) => void;
}): HeaderCol[] => {
  const { sortMethod } = useService({
    setActiveSortingDirection,
    setActiveSorting,
    setRuns,
    activeSorting,
    activeSortingDirection,
    runs,
  });
  return [
    // {
    //   width: '2%',
    //   renderRow: (stack: TStack) => <></>,
    // },
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
          <Paragraph
            size="small"
            color="black"
            style={{ fontSize: '12px', marginLeft: '33px' }}
          >
            RUN ID
          </Paragraph>
        </SortingHeader>
      ),
      width: '10%',
      renderRow: (run: TRun) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={run.id}>
            <FlexBox.Row style={{ alignItems: 'center' }}>
              {expendedRow?.length === 1 ? (
                <icons.chevronDown
                  color={iconColors.grey}
                  size={iconSizes.xs}
                />
              ) : (
                <icons.rightArrow color={iconColors.grey} size={iconSizes.xs} />
              )}
              <Paragraph size="small" style={{ marginLeft: '20px' }}>
                {truncate(run.id, ID_MAX_LENGTH)}
              </Paragraph>
            </FlexBox.Row>
          </div>
          <ReactTooltip id={run.id} place="top" effect="solid">
            <Paragraph size="small">
              {truncate(run.id, ID_MAX_LENGTH)}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="black">
          RUN NAME
        </Paragraph>
      ),
      width: '10%',
      renderRow: (run: TRun) => (
        <Paragraph
          size="small"
          style={{ color: '#22BBDD', textDecoration: 'underline' }}
        >
          {run.name}
        </Paragraph>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="black">
          PIPELINE
        </Paragraph>
      ),
      width: '10%',
      renderRow: (run: TRun) => (
        <Paragraph
          size="small"
          style={{ color: '#22BBDD', textDecoration: 'underline' }}
        >
          {run.pipeline.name} {run.pipeline?.spec.version}
        </Paragraph>
      ),
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
            STATUS
          </Paragraph>
        </SortingHeader>
      ),
      width: '10%',
      renderRow: (run: TRun) => <RunStatus run={run} />,
    },

    {
      render: () => (
        <Paragraph size="small" color="black">
          STACK NAME
        </Paragraph>
      ),
      width: '10%',
      renderRow: (run: TRun) => (
        <Paragraph size="small">{run.stack.name}</Paragraph>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="black">
          AUTHOR
        </Paragraph>
      ),
      width: '10%',
      renderRow: (run: TRun) => {
        return (
          <FlexBox alignItems="center">
            <Paragraph size="small">
              {run.user.full_name ? run.user.full_name : run.user.name}
            </Paragraph>
          </FlexBox>
        );
      },
    },
    {
      render: () => (
        <SortingHeader
          sorting="created"
          sortMethod={sortMethod('created', {
            asc: (runs: TRun[]) =>
              _.orderBy(runs, (run: TRun) => new Date(run.created).getTime(), [
                'asc',
              ]),
            desc: (runs: TRun[]) =>
              _.orderBy(runs, (run: TRun) => new Date(run.created).getTime(), [
                'desc',
              ]),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black">
            CREATED
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
            {formatDateToDisplayOnTable(run.created)}
          </Paragraph>
        </FlexBox>
      ),
    },
  ];
};
