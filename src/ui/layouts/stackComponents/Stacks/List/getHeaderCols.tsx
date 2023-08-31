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
import { StackComponent } from '../../../../../api/types';

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
  filteredStacks: StackComponent[];
  setFilteredStacks: (stacks: StackComponent[]) => void;
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
            asc: (filteredStacks: StackComponent[]) =>
              _.orderBy(filteredStacks, ['id'], ['asc']),
            desc: (filteredStacks: StackComponent[]) =>
              _.orderBy(filteredStacks, ['id'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph
            size="small"
            color="black"
            style={{ fontSize: '14px', marginLeft: '25px' }}
          >
            ID
          </Paragraph>
        </SortingHeader>
      ),
      width: '20%',
      renderRow: (stackComponent: StackComponent) => (
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
          <Tooltip id={stackComponent.id} text={stackComponent.id} />
        </FlexBox>
      ),
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={filteredStacks.length === 1 || expendedRow?.length === 1}
          sorting="name"
          sortMethod={sortMethod('name', {
            asc: (filteredStacks: StackComponent[]) =>
              _.orderBy(filteredStacks, ['name'], ['asc']),
            desc: (filteredStacks: StackComponent[]) =>
              _.orderBy(filteredStacks, ['name'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
            NAME
          </Paragraph>
        </SortingHeader>
      ),
      width: '30%',
      renderRow: (stackComponent: StackComponent) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={stackComponent.name}>
            <Paragraph size="small" color="black">
              {stackComponent.name}
            </Paragraph>
          </div>
          <Tooltip id={stackComponent.name} text={stackComponent.name} />
        </FlexBox>
      ),
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={filteredStacks.length === 1 || expendedRow?.length === 1}
          sorting="flavor"
          sortMethod={sortMethod('flavor', {
            asc: (filteredStacks: StackComponent[]) =>
              _.orderBy(filteredStacks, ['flavor'], ['asc']),
            desc: (filteredStacks: StackComponent[]) =>
              _.orderBy(filteredStacks, ['flavor'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <div style={{ margin: '0 auto 0 auto', textAlign: 'center' }}>
            <Paragraph
              size="small"
              color="black"
              style={{ fontSize: '14px', marginLeft: '-24px' }}
            >
              FLAVOR
            </Paragraph>
          </div>
        </SortingHeader>
      ),
      width: '10%',
      renderRow: (stackComponent: any) => (
        <FlexBox alignItems="center" style={{ marginLeft: '-24px' }}>
          <div
            data-tip
            data-for={stackComponent?.flavor?.name || stackComponent?.flavor}
            style={{ margin: ' 0 auto 0 auto' }}
          >
            <img
              alt={stackComponent?.flavor?.logoUrl}
              src={stackComponent?.flavor?.logoUrl}
              style={{
                height: '28px',
                width: '28px',
              }}
            />
          </div>
          <Tooltip
            id={stackComponent?.flavor?.name || stackComponent?.flavor}
            text={stackComponent?.flavor?.name}
          />
        </FlexBox>
      ),
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={filteredStacks.length === 1 || expendedRow?.length === 1}
          sorting="is_shared"
          sortMethod={sortMethod('is_shared', {
            asc: (filteredStacks: StackComponent[]) =>
              _.orderBy(filteredStacks, ['is_shared'], ['asc']),
            desc: (filteredStacks: StackComponent[]) =>
              _.orderBy(filteredStacks, ['is_shared'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <div style={{ margin: '0 auto 0 auto', textAlign: 'center' }}>
            <Paragraph
              size="small"
              color="black"
              style={{ fontSize: '14px', marginLeft: '-24px' }}
            >
              SHARED
            </Paragraph>
          </div>
        </SortingHeader>
      ),
      width: '10%',
      renderRow: (stackComponent: StackComponent) => (
        <FlexBox alignItems="center" style={{ marginLeft: '-24px' }}>
          <div
            data-tip
            data-for={stackComponent.is_shared}
            style={{ margin: '0 auto 0 auto' }}
          >
            <Box>
              <FlexBox justifyContent="center">
                {stackComponent.is_shared ? (
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
            id={stackComponent.is_shared ? 'true' : 'false'}
            text={stackComponent.is_shared ? 'true' : 'false'}
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
            asc: (filteredStacks: StackComponent[]) =>
              _.orderBy(filteredStacks, ['user_id'], ['asc']),
            desc: (filteredStacks: StackComponent[]) =>
              _.orderBy(filteredStacks, ['user_id'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
            AUTHOR
          </Paragraph>
        </SortingHeader>
      ),
      width: '10%',
      renderRow: (stackComponent: StackComponent) => {
        return (
          <FlexBox alignItems="center">
            <div
              data-tip
              data-for={
                stackComponent?.user?.full_name
                  ? stackComponent.user.full_name
                  : stackComponent?.user?.name
              }
            >
              <FlexBox alignItems="center">
                <Paragraph size="small">
                  {stackComponent?.user?.full_name
                    ? stackComponent.user.full_name
                    : stackComponent?.user?.name}
                </Paragraph>
              </FlexBox>
            </div>
            <Tooltip
              id={
                stackComponent?.user?.full_name
                  ? stackComponent?.user?.full_name
                  : stackComponent?.user?.name
              }
              text={
                stackComponent?.user?.full_name
                  ? stackComponent?.user?.full_name
                  : stackComponent?.user?.name
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
            asc: (filteredStacks: StackComponent[]) =>
              _.orderBy(
                filteredStacks,
                (stack: StackComponent) => new Date(stack.created).getTime(),
                ['asc'],
              ),
            desc: (filteredStacks: StackComponent[]) =>
              _.orderBy(
                filteredStacks,
                (stack: StackComponent) => new Date(stack.created).getTime(),
                ['desc'],
              ),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
            CREATED AT
          </Paragraph>
        </SortingHeader>
      ),
      width: '20%',
      renderRow: (stackComponent: StackComponent) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={formatDateToSort(stackComponent.created)}>
            <FlexBox alignItems="center">
              <Paragraph color="grey" size="tiny">
                {formatDateToDisplayOnTable(stackComponent.created)}
              </Paragraph>
            </FlexBox>
          </div>
          <Tooltip
            id={formatDateToSort(stackComponent.created)}
            text={formatDateToDisplayOnTable(stackComponent.created)}
          />
        </FlexBox>
      ),
    },
  ];
};
