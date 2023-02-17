import _ from 'lodash';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../../constants';
import {
  truncate,
  formatDateToSort,
  formatDateToDisplayOnTable,
} from '../../../../../utils';
import { Box, FlexBox, icons, Paragraph } from '../../../../components';
import { HeaderCol } from '../../../common/Table';
import { SortingHeader } from './ForSorting/SortingHeader';
import { Sorting, SortingDirection } from './ForSorting/types';

import { useService } from './ForSorting/useServiceForSorting';

export const GetHeaderCols = ({
  expendedRow,
  openStackIds,
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
  filteredStacks: TStack[];
  setFilteredStacks: (stacks: TStack[]) => void;
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

  console.log(expendedRow, 'expendedRow');
  return [
    // {
    //   width: '2%',
    //   renderRow: (stackComponent: TStack) => <></>,
    // },

    {
      render: () => (
        <SortingHeader
          onlyOneRow={filteredStacks.length === 1 || expendedRow?.length === 1}
          sorting="id"
          sortMethod={sortMethod('id', {
            asc: (filteredStacks: TStack[]) =>
              _.orderBy(filteredStacks, ['id'], ['asc']),
            desc: (filteredStacks: TStack[]) =>
              _.orderBy(filteredStacks, ['id'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph
            size="small"
            color="black"
            style={{ fontSize: '12px', marginLeft: '25px' }}
          >
            ID
          </Paragraph>
        </SortingHeader>
      ),
      width: '15%',
      renderRow: (stackComponent: TStack) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={stackComponent.id}>
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
                {truncate(stackComponent.id, ID_MAX_LENGTH)}
              </Paragraph>
            </FlexBox.Row>
          </div>
          <ReactTooltip id={stackComponent.id} place="top" effect="solid">
            <Paragraph color="white">{stackComponent.id}</Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={filteredStacks.length === 1 || expendedRow?.length === 1}
          sorting="name"
          sortMethod={sortMethod('name', {
            asc: (filteredStacks: TStack[]) =>
              _.orderBy(filteredStacks, ['name'], ['asc']),
            desc: (filteredStacks: TStack[]) =>
              _.orderBy(filteredStacks, ['name'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '12px' }}>
            NAME
          </Paragraph>
        </SortingHeader>
      ),
      width: '15%',
      renderRow: (stackComponent: TStack) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={stackComponent.name}>
            <Paragraph size="small" color="black">
              {stackComponent.name}
            </Paragraph>
          </div>
          <ReactTooltip id={stackComponent.name} place="top" effect="solid">
            <Paragraph color="white">{stackComponent.name}</Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={filteredStacks.length === 1 || expendedRow?.length === 1}
          sorting="flavor"
          sortMethod={sortMethod('flavor', {
            asc: (filteredStacks: TStack[]) =>
              _.orderBy(filteredStacks, ['flavor'], ['asc']),
            desc: (filteredStacks: TStack[]) =>
              _.orderBy(filteredStacks, ['flavor'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <div style={{ margin: '0 auto 0 auto' }}>
            <Paragraph size="small" color="black" style={{ fontSize: '12px', marginLeft: '-24px' }}>
              FLAVOR
            </Paragraph>
          </div>
        </SortingHeader>
      ),
      width: '15%',
      renderRow: (stackComponent: TStack) => (
        <FlexBox alignItems="center" style={{ marginLeft: '-24px' }}>
          <div
            data-tip
            data-for={stackComponent?.flavor?.name || stackComponent?.flavor}
            style={{ margin: ' 0 auto 0 auto' }}
          >
            <img
              alt={stackComponent.flavor.logoUrl}
              src={stackComponent.flavor.logoUrl}
              style={{
                height: '28px',
                width: '28px',
              }}
            />
          </div>

          <ReactTooltip
            id={
              // stackComponent?.flavor
              //   ? stackComponent?.flavor
              stackComponent?.flavor?.name || stackComponent?.flavor
            }
            place="top"
            effect="solid"
          >
            <Paragraph color="white">{stackComponent.flavor.name}</Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={filteredStacks.length === 1 || expendedRow?.length === 1}
          sorting="is_shared"
          sortMethod={sortMethod('is_shared', {
            asc: (filteredStacks: TStack[]) =>
              _.orderBy(filteredStacks, ['is_shared'], ['asc']),
            desc: (filteredStacks: TStack[]) =>
              _.orderBy(filteredStacks, ['is_shared'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <div style={{ margin: '0 auto 0 auto' }}>
            <Paragraph size="small" color="black" style={{ fontSize: '12px', marginLeft: '-24px' }}>
              SHARED
            </Paragraph>
          </div>
        </SortingHeader>
      ),
      width: '15%',
      renderRow: (stackComponent: TStack) => (
        <FlexBox alignItems="center" style={{ marginLeft: '-24px' }}>
          <div
            data-tip
            data-for={stackComponent.isShared}
            style={{ margin: '0 auto 0 auto' }}
          >
            <Box>
              <FlexBox
                justifyContent="center"
                style={{
                  borderRadius: '50%',
                  height: '19px',
                  width: '19px',
                  textAlign: 'center',
                }}
              >
                {stackComponent.isShared ? (
                  <icons.multiUser
                    color={iconColors.white}
                    size={iconSizes.sm}
                  />
                ) : (
                  <icons.singleUser
                    color={iconColors.white}
                    size={iconSizes.sm}
                  />
                )}
              </FlexBox>
            </Box>
          </div>
          <ReactTooltip
            id={stackComponent.isShared ? 'true' : 'false'}
            place="top"
            effect="solid"
          >
            <Paragraph color="white">
              {stackComponent.isShared ? 'True' : 'False'}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={filteredStacks.length === 1 || expendedRow?.length === 1}
          sorting="user_id"
          sortMethod={sortMethod('user_id', {
            asc: (filteredStacks: TStack[]) =>
              _.orderBy(filteredStacks, ['user_id'], ['asc']),
            desc: (filteredStacks: TStack[]) =>
              _.orderBy(filteredStacks, ['user_id'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '12px' }}>
            AUTHOR
          </Paragraph>
        </SortingHeader>
      ),
      width: '15%',
      renderRow: (stackComponent: TStack) => {
        return (
          <FlexBox alignItems="center">
            <div
              data-tip
              data-for={
                stackComponent.user.full_name
                  ? stackComponent.user.full_name
                  : stackComponent.user.name
              }
            >
              <FlexBox alignItems="center">
                <Paragraph size="small">
                  {stackComponent.user.full_name
                    ? stackComponent.user.full_name
                    : stackComponent.user.name}
                </Paragraph>
              </FlexBox>
            </div>
            <ReactTooltip
              id={
                stackComponent.user.full_name
                  ? stackComponent.user.full_name
                  : stackComponent.user.name
              }
              place="top"
              effect="solid"
            >
              <Paragraph color="white">
                {stackComponent.user.full_name
                  ? stackComponent.user.full_name
                  : stackComponent.user.name}
              </Paragraph>
            </ReactTooltip>
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
            asc: (filteredStacks: TStack[]) =>
              _.orderBy(
                filteredStacks,
                (stack: TStack) => new Date(stack.created).getTime(),
                ['asc'],
              ),
            desc: (filteredStacks: TStack[]) =>
              _.orderBy(
                filteredStacks,
                (stack: TStack) => new Date(stack.created).getTime(),
                ['desc'],
              ),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '12px' }}>
            CREATED AT
          </Paragraph>
        </SortingHeader>
      ),
      width: '15%',
      renderRow: (stackComponent: TStack) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={formatDateToSort(stackComponent.created)}>
            <FlexBox alignItems="center">
              <Box paddingRight="sm">
                <icons.calendar color={iconColors.grey} size={iconSizes.sm} />
              </Box>
              <Paragraph color="grey" size="tiny">
                {formatDateToDisplayOnTable(stackComponent.created)}
              </Paragraph>
            </FlexBox>
          </div>
          <ReactTooltip
            id={formatDateToSort(stackComponent.created)}
            place="top"
            effect="solid"
          >
            <Paragraph color="white">
              {formatDateToDisplayOnTable(stackComponent.created)}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
  ];
};
