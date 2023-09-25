import _ from 'lodash';
import React from 'react';
import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../../constants';
import {
  truncate,
  formatDateToSort,
  formatDateToDisplayOnTable,
} from '../../../../../utils';
import {
  Box,
  FlexBox,
  icons,
  Paragraph,
  Tooltip,
} from '../../../../components';
import { HeaderCol } from '../../../common/Table';
import { SortingHeader } from './ForSorting/SortingHeader';
import { Sorting, SortingDirection } from './ForSorting/types';
import { useService } from './ForSorting/useServiceForSorting';
import { Stack } from '../../../../../api/types';

const HeaderText = ({ text, margin }: { text: string; margin?: string }) => (
  <Paragraph
    size="small"
    color="black"
    style={{ fontSize: '14px', marginLeft: margin }}
  >
    {text}
  </Paragraph>
);

export const GetHeaderCols = ({
  expendedRow,
  setOpenStackIds,
  filteredStacks,
  setFilteredStacks,
  activeSorting,
  activeSortingDirection,
  setActiveSortingDirection,
  setActiveSorting,
}: {
  expendedRow?: any;
  openStackIds: TId[];
  setOpenStackIds: (ids: TId[]) => void;
  filteredStacks: Stack[];
  setFilteredStacks: (stacks: Stack[]) => void;
  activeSorting: Sorting | null;
  activeSortingDirection: SortingDirection | null;
  setActiveSortingDirection: (direction: SortingDirection | null) => void;
  setActiveSorting: (sorting: Sorting | null) => void;
}): HeaderCol[] => {
  const { sortMethod } = useService({
    setActiveSortingDirection,
    setActiveSorting,
    setFilteredStacks,
    activeSorting,
    activeSortingDirection,
    filteredStacks,
  });

  return [
    {
      render: () => (
        <SortingHeader
          onlyOneRow={filteredStacks.length === 1 || expendedRow?.length === 1}
          sorting="id"
          sortMethod={sortMethod('id', {
            asc: (filteredStacks: Stack[]) =>
              _.orderBy(filteredStacks, ['id'], ['asc']),
            desc: (filteredStacks: Stack[]) =>
              _.orderBy(filteredStacks, ['id'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <HeaderText text="ID" margin="33px" />
        </SortingHeader>
      ),
      width: '20%',
      renderRow: (stack: Stack) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={stack.id}>
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
                {truncate(stack.id, ID_MAX_LENGTH)}
              </Paragraph>
            </FlexBox.Row>
          </div>
          <Tooltip id={stack.id} text={stack.id} />
        </FlexBox>
      ),
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={filteredStacks.length === 1 || expendedRow?.length === 1}
          sorting="name"
          sortMethod={sortMethod('name', {
            asc: (filteredStacks: Stack[]) =>
              _.orderBy(filteredStacks, ['name'], ['asc']),
            desc: (filteredStacks: Stack[]) =>
              _.orderBy(filteredStacks, ['name'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <HeaderText text="NAME" />
        </SortingHeader>
      ),
      width: '30%',
      renderRow: (stack: Stack) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={stack.name}>
            <Paragraph size="small" color="black">
              {stack.name}
            </Paragraph>
          </div>
          <Tooltip id={stack.name} text={stack.name} />
        </FlexBox>
      ),
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={filteredStacks.length === 1 || expendedRow?.length === 1}
          sorting="is_shared"
          sortMethod={sortMethod('is_shared', {
            asc: (filteredStacks: Stack[]) =>
              _.orderBy(filteredStacks, ['is_shared'], ['asc']),
            desc: (filteredStacks: Stack[]) =>
              _.orderBy(filteredStacks, ['is_shared'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Box style={{ margin: '0 auto 0 auto', textAlign: 'center' }}>
            <HeaderText text="SHARED" margin="-16px" />
          </Box>
        </SortingHeader>
      ),
      width: '15%',
      renderRow: (stack: Stack) => (
        <FlexBox alignItems="center">
          <div
            style={{ margin: '0 auto 0 auto' }}
            data-tip
            data-for={stack.is_shared}
          >
            <Box>
              <FlexBox justifyContent="center" style={{ marginLeft: '-16px' }}>
                {stack.is_shared ? (
                  <icons.multiUser
                    color={iconColors.white}
                    size={iconSizes.md}
                  />
                ) : (
                  <icons.singleUser
                    color={iconColors.white}
                    size={iconSizes.md}
                  />
                )}
              </FlexBox>
            </Box>
          </div>
          <Tooltip
            id={stack.is_shared ? 'true' : 'false'}
            text={stack.is_shared ? 'true' : 'false'}
          />
        </FlexBox>
      ),
    },

    {
      render: () => (
        <SortingHeader
          onlyOneRow={filteredStacks.length === 1 || expendedRow?.length === 1}
          sorting="user_id"
          sortMethod={sortMethod('user_id', {
            asc: (filteredStacks: Stack[]) =>
              _.orderBy(filteredStacks, ['user_id'], ['asc']),
            desc: (filteredStacks: Stack[]) =>
              _.orderBy(filteredStacks, ['user_id'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <HeaderText text="AUTHOR" />
        </SortingHeader>
      ),
      width: '15%',
      renderRow: (stack: Stack) => {
        return (
          <FlexBox alignItems="center">
            <div
              data-tip
              data-for={
                stack?.user?.full_name
                  ? stack?.user?.full_name
                  : stack?.user?.name
              }
            >
              <FlexBox alignItems="center">
                <Paragraph size="small">
                  {stack?.user?.full_name
                    ? stack?.user?.full_name
                    : stack?.user?.name}
                </Paragraph>
              </FlexBox>
            </div>
            <Tooltip
              id={
                stack?.user?.full_name
                  ? stack?.user?.full_name
                  : stack?.user?.name
              }
              text={
                stack?.user?.full_name
                  ? stack?.user?.full_name
                  : stack?.user?.name
              }
            />
          </FlexBox>
        );
      },
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={filteredStacks.length === 1 || expendedRow?.length === 1}
          sorting="created"
          sortMethod={sortMethod('created', {
            asc: (filteredStacks: Stack[]) =>
              _.orderBy(
                filteredStacks,
                (stack: Stack) => new Date(stack.created).getTime(),
                ['asc'],
              ),
            desc: (filteredStacks: Stack[]) =>
              _.orderBy(
                filteredStacks,
                (stack: Stack) => new Date(stack.created).getTime(),
                ['desc'],
              ),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <HeaderText text="CREATED AT" />
        </SortingHeader>
      ),
      width: '20%',
      renderRow: (stack: Stack) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={formatDateToSort(stack.created)}>
            <FlexBox alignItems="center">
              <Paragraph color="grey" size="tiny">
                {formatDateToDisplayOnTable(stack.created)}
              </Paragraph>
            </FlexBox>
          </div>
          <Tooltip
            id={formatDateToSort(stack.created)}
            text={formatDateToDisplayOnTable(stack.created)}
          />
        </FlexBox>
      ),
    },
  ];
};
