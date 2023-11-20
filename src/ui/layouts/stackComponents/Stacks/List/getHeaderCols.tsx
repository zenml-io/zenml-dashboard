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
          <HeaderText text="ID" margin="25px" />
        </SortingHeader>
      ),
      testId: 'Id',
      width: '22%',
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
          <HeaderText text="NAME" />
        </SortingHeader>
      ),
      testId: 'Name',
      width: '32%',
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
            <HeaderText text="FLAVOR" margin="-24px" />
          </div>
        </SortingHeader>
      ),
      testId: 'Flavor',
      width: '12%',
      renderRow: (stackComponent: any) => (
        <FlexBox alignItems="center" style={{ marginLeft: '-24px' }}>
          <div
            data-tip
            data-for={stackComponent?.flavor?.name}
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
            id={stackComponent?.flavor?.name}
            text={stackComponent?.flavor?.name}
          />
        </FlexBox>
      ),
    },
    // {
    //   render: () => (
    //     <SortingHeader
    //       onlyOneRow={filteredStacks.length === 1 || expendedRow?.length === 1}
    //       sorting="is_shared"
    //       sortMethod={sortMethod('is_shared', {
    //         asc: (filteredStacks: StackComponent[]) =>
    //           _.orderBy(filteredStacks, ['is_shared'], ['asc']),
    //         desc: (filteredStacks: StackComponent[]) =>
    //           _.orderBy(filteredStacks, ['is_shared'], ['desc']),
    //       })}
    //       activeSorting={activeSorting}
    //       activeSortingDirection={activeSortingDirection}
    //     >
    //       <div style={{ margin: '0 auto 0 auto', textAlign: 'center' }}>
    //         <HeaderText text="SHARED" margin="-24px" />
    //       </div>
    //     </SortingHeader>
    //   ),
    //   testId: 'Shared',
    //   width: '10%',
    //   renderRow: (stackComponent: StackComponent) => (
    //     <FlexBox alignItems="center" style={{ marginLeft: '-24px' }}>
    //       <div
    //         data-tip
    //         data-for={`tooltip-${String(stackComponent.body.is_shared)}`}
    //         style={{ margin: '0 auto 0 auto' }}
    //       >
    //         <Box>
    //           <FlexBox justifyContent="center">
    //             {stackComponent.body.is_shared ? (
    //               <icons.multiUser
    //                 color={iconColors.white}
    //                 size={iconSizes.md}
    //               />
    //             ) : (
    //               <icons.singleUser
    //                 color={iconColors.white}
    //                 size={iconSizes.md}
    //               />
    //             )}
    //           </FlexBox>
    //         </Box>
    //       </div>
    //       <Tooltip
    //         id={`tooltip-${String(stackComponent.body.is_shared)}`}
    //         text={stackComponent.body.is_shared ? 'True' : 'False'}
    //       />
    //     </FlexBox>
    //   ),
    // },
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
          <HeaderText text="AUTHOR" />
        </SortingHeader>
      ),
      testId: 'Author',
      width: '12%',
      renderRow: (stackComponent: StackComponent) => {
        return (
          <FlexBox alignItems="center">
            <div data-tip data-for={stackComponent?.body?.user?.name}>
              <FlexBox alignItems="center">
                <Paragraph size="small">
                  {stackComponent?.body?.user?.name}
                </Paragraph>
              </FlexBox>
            </div>
            <Tooltip
              id={stackComponent?.body?.user?.name}
              text={stackComponent?.body?.user?.name}
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
                (stack: StackComponent) =>
                  new Date(stack.body?.created as string).getTime(),
                ['asc'],
              ),
            desc: (filteredStacks: StackComponent[]) =>
              _.orderBy(
                filteredStacks,
                (stack: StackComponent) =>
                  new Date(stack.body?.created as string).getTime(),
                ['desc'],
              ),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <HeaderText text="CREATED AT" />
        </SortingHeader>
      ),
      testId: 'created_at',
      width: '22%',
      renderRow: (stackComponent: StackComponent) => (
        <FlexBox alignItems="center">
          <div
            data-tip
            data-for={formatDateToSort(stackComponent.body?.created as string)}
          >
            <FlexBox alignItems="center">
              <Paragraph color="grey" size="tiny">
                {formatDateToDisplayOnTable(stackComponent.body?.created)}
              </Paragraph>
            </FlexBox>
          </div>
          <Tooltip
            id={formatDateToSort(stackComponent.body?.created as string)}
            text={formatDateToDisplayOnTable(stackComponent.body?.created)}
          />
        </FlexBox>
      ),
    },
  ];
};
