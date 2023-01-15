import _ from 'lodash';
import React, { useState } from 'react';
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
  ColoredCircle,
  icons,
  LinkBox,
  Paragraph,
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

  const [toggle, setToggle] = useState(false);
  return [
    {
      width: '3%',
      renderRow: (stack: TStack) => (
        <LinkBox
          onClick={(e: Event) => {
            setToggle(!toggle);
            e.stopPropagation();
            if (openStackIds.indexOf(stack.id) === -1) {
              setOpenStackIds([...openStackIds, stack.id]);
            } else {
              setOpenStackIds(
                openStackIds.filter((id: TId) => id !== stack.id),
              );
            }
          }}
        >
          <FlexBox
            justifyContent="center"
            style={{ paddingTop: '5px', paddingBottom: '5px' }}
          >
            {openStackIds.indexOf(stack.id) === -1 ? (
              <icons.rightArrow color={iconColors.grey} size={iconSizes.sm} />
            ) : (
              <icons.chevronDown color={iconColors.grey} size={iconSizes.sm} />
            )}
          </FlexBox>
        </LinkBox>
      ),
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
      width: '8%',
      renderRow: (stack: TStack) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={stack.id}>
            <Paragraph size="small">
              {truncate(stack.id, ID_MAX_LENGTH)}
            </Paragraph>
          </div>
          <ReactTooltip id={stack.id} place="top" effect="solid">
            <Paragraph color="white">{stack.id}</Paragraph>
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
      width: '8%',
      renderRow: (stack: TStack) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={stack.name}>
            <Paragraph size="small" color="black">
              {stack.name}
            </Paragraph>
          </div>
          <ReactTooltip id={stack.name} place="top" effect="solid">
            <Paragraph color="white">{stack.name}</Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
    {
      render: () => (
        <SortingHeader
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
          <Paragraph size="small" color="black" style={{ fontSize: '12px' }}>
            SHARED
          </Paragraph>
        </SortingHeader>
      ),
      width: '8%',
      renderRow: (stack: TStack) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={stack.isShared}>
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
                {stack.isShared ? (
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
            id={stack.isShared ? 'true' : 'false'}
            place="top"
            effect="solid"
          >
            <Paragraph color="white">
              {stack.isShared ? 'True' : 'False'}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },

    {
      render: () => (
        <SortingHeader
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
      width: '11%',
      renderRow: (stack: TStack) => {
        const initials = getInitialsFromEmail(
          stack?.userName ? stack.userName : stack?.user?.name,
        );
        return (
          <FlexBox alignItems="center">
            <div
              data-tip
              data-for={
                stack.user.full_name ? stack.user.full_name : stack.user.name
              }
            >
              <FlexBox alignItems="center">
                <Box paddingRight="sm">
                  <ColoredCircle color="secondary" size="sm">
                    {initials}
                  </ColoredCircle>
                </Box>
                <Paragraph size="small">
                  {stack.user.full_name
                    ? stack.user.full_name
                    : stack.user.name}
                </Paragraph>
              </FlexBox>
            </div>
            <ReactTooltip
              id={stack.user.full_name ? stack.user.full_name : stack.user.name}
              place="top"
              effect="solid"
            >
              <Paragraph color="white">
                {stack.user.full_name ? stack.user.full_name : stack.user.name}
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
      width: '8%',
      renderRow: (stack: TStack) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={formatDateToSort(stack.created)}>
            <FlexBox alignItems="center">
              <Box paddingRight="sm">
                <icons.calendar color={iconColors.grey} size={iconSizes.sm} />
              </Box>
              <Paragraph color="grey" size="tiny">
                {formatDateToDisplayOnTable(stack.created)}
              </Paragraph>
            </FlexBox>
          </div>
          <ReactTooltip
            id={formatDateToSort(stack.created)}
            place="top"
            effect="solid"
          >
            <Paragraph color="white">
              {formatDateToDisplayOnTable(stack.created)}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
  ];
};
