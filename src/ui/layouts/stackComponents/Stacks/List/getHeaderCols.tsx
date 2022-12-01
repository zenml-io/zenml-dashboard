import _ from 'lodash';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../../constants';
import {
  truncate,
  getInitialsFromEmail,
  formatDateToSort,
  formatDateToDisplayOnTable,
} from '../../../../../utils';
import {
  Box,
  FlexBox,
  icons,
  Paragraph,
  ColoredCircle,
} from '../../../../components';
import { HeaderCol } from '../../../common/Table';
import { SortingHeader } from './ForSorting/SortingHeader';
import { Sorting, SortingDirection } from './ForSorting/types';

import { useService } from './ForSorting/useServiceForSorting';

export const GetHeaderCols = ({
  openStackIds,
  setOpenStackIds,
  filteredStacks,
  setFilteredStacks,
  activeSorting,
  activeSortingDirection,
  setActiveSortingDirection,
  setActiveSorting,
}: {
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
  return [
    {
      width: '2%',
      renderRow: (stackComponent: TStack) => <></>,
    },

    {
      render: () => (
        <SortingHeader
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
          <Paragraph size="small" color="black" style={{ fontSize: '12px' }}>
            ID
          </Paragraph>
        </SortingHeader>
      ),
      width: '15%',
      renderRow: (stackComponent: TStack) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={stackComponent.id}>
            <Paragraph size="small">
              {truncate(stackComponent.id, ID_MAX_LENGTH)}
            </Paragraph>
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
          <Paragraph size="small" color="black" style={{ fontSize: '12px' }}>
            FLAVOR
          </Paragraph>
        </SortingHeader>
      ),
      width: '15%',
      renderRow: (stackComponent: TStack) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={stackComponent.flavor}>
            <Paragraph size="small" color="black">
              {stackComponent.flavor}
            </Paragraph>
          </div>
          <ReactTooltip id={stackComponent.flavor} place="top" effect="solid">
            <Paragraph color="white">{stackComponent.flavor}</Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
    {
      render: () => (
        <SortingHeader
          sorting="isShared"
          sortMethod={sortMethod('isShared', {
            asc: (filteredStacks: TStack[]) =>
              _.orderBy(filteredStacks, ['isShared'], ['asc']),
            desc: (filteredStacks: TStack[]) =>
              _.orderBy(filteredStacks, ['isShared'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '12px' }}>
            SHARED
          </Paragraph>
        </SortingHeader>
      ),
      width: '15%',
      renderRow: (stackComponent: TStack) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={stackComponent.isShared}>
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
          sorting="user.name"
          sortMethod={sortMethod('user.name', {
            asc: (filteredStacks: TStack[]) =>
              _.orderBy(filteredStacks, ['user.name'], ['asc']),
            desc: (filteredStacks: TStack[]) =>
              _.orderBy(filteredStacks, ['user.name'], ['desc']),
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
        const initials = getInitialsFromEmail(
          stackComponent.user.full_name
            ? stackComponent.user.full_name
            : stackComponent.user.name,
        );
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
                <Box paddingRight="sm">
                  <ColoredCircle color="secondary" size="sm">
                    {initials}
                  </ColoredCircle>
                </Box>
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
            <Paragraph color="white">{stackComponent.created}</Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
  ];
};
