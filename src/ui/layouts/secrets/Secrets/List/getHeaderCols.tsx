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
  // opensecretIds,
  setOpenSecretIds,
  filteredSecrets,
  setFilteredSecrets,
  activeSorting,
  activeSortingDirection,
  setActiveSortingDirection,
  setActiveSorting,
}: {
  expendedRow?: any;
  openSecretIds: TId[];
  setOpenSecretIds: (ids: TId[]) => void;
  filteredSecrets: any[];
  setFilteredSecrets: (secrets: any[]) => void;
  activeSorting: Sorting | null;
  activeSortingDirection: SortingDirection | null;
  setActiveSortingDirection: (direction: SortingDirection | null) => void;
  setActiveSorting: (sorting: Sorting | null) => void;
}): HeaderCol[] => {
  const { sortMethod } = useService({
    setActiveSortingDirection,
    setActiveSorting,
    setFilteredSecrets,
    activeSorting,
    activeSortingDirection,
    filteredSecrets,
  });

  return [
    // {
    //   width: '3%',
    //   renderRow: (secret: any) => (
    //     <LinkBox
    //       onClick={(e: Event) => {
    //         setToggle(!toggle);
    //         e.stopPropagation();
    //         if (opensecretIds.indexOf(secret.id) === -1) {
    //           setOpensecretIds([...opensecretIds, secret.id]);
    //         } else {
    //           setOpensecretIds(
    //             opensecretIds.filter((id: TId) => id !== secret.id),
    //           );
    //         }
    //       }}
    //     >
    //       <FlexBox
    //         justifyContent="center"
    //         style={{ paddingTop: '5px', paddingBottom: '5px' }}
    //       >
    //         {opensecretIds.indexOf(secret.id) === -1 ? (
    //           <icons.rightArrow color={iconColors.grey} size={iconSizes.sm} />
    //         ) : (
    //           <icons.chevronDown color={iconColors.grey} size={iconSizes.sm} />
    //         )}
    //       </FlexBox>
    //     </LinkBox>
    //   ),
    // },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={filteredSecrets.length === 1 || expendedRow?.length === 1}
          sorting="id"
          sortMethod={sortMethod('id', {
            asc: (filteredSecrets: any[]) =>
              _.orderBy(filteredSecrets, ['id'], ['asc']),
            desc: (filteredSecrets: any[]) =>
              _.orderBy(filteredSecrets, ['id'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph
            size="small"
            color="black"
            style={{ fontSize: '14px', marginLeft: '33px' }}
          >
            SECRET ID
          </Paragraph>
        </SortingHeader>
      ),
      width: '20%',
      renderRow: (secret: any) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={secret.id}>
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
                {truncate(secret.id, ID_MAX_LENGTH)}
              </Paragraph>
            </FlexBox.Row>
          </div>
          <ReactTooltip id={secret.id} place="top" effect="solid">
            <Paragraph color="white">{secret.id}</Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={filteredSecrets.length === 1 || expendedRow?.length === 1}
          sorting="name"
          sortMethod={sortMethod('name', {
            asc: (filteredSecrets: any[]) =>
              _.orderBy(filteredSecrets, ['name'], ['asc']),
            desc: (filteredSecrets: any[]) =>
              _.orderBy(filteredSecrets, ['name'], ['desc']),
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
      renderRow: (secret: any) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={secret.name}>
            <Paragraph size="small" color="black">
              {secret.name}
            </Paragraph>
          </div>
          <ReactTooltip id={secret.name} place="top" effect="solid">
            <Paragraph color="white">{secret.name}</Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={filteredSecrets.length === 1 || expendedRow?.length === 1}
          sorting="is_shared"
          sortMethod={sortMethod('is_shared', {
            asc: (filteredSecrets: any[]) =>
              _.orderBy(filteredSecrets, ['is_shared'], ['asc']),
            desc: (filteredSecrets: any[]) =>
              _.orderBy(filteredSecrets, ['is_shared'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Box style={{}}>
            <Paragraph size="small" color="black">
              SCOPE
            </Paragraph>
          </Box>
        </SortingHeader>
      ),
      width: '15%',
      renderRow: (secret: any) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={secret.scope}>
            <Paragraph size="small" color="black">
              {secret.scope}
            </Paragraph>
          </div>
          <ReactTooltip id={secret.scope} place="top" effect="solid">
            <Paragraph color="white">{secret.scope}</Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },

    {
      render: () => (
        <SortingHeader
          onlyOneRow={filteredSecrets.length === 1 || expendedRow?.length === 1}
          sorting="user_id"
          sortMethod={sortMethod('user_id', {
            asc: (filteredSecrets: any[]) =>
              _.orderBy(filteredSecrets, ['user_id'], ['asc']),
            desc: (filteredSecrets: any[]) =>
              _.orderBy(filteredSecrets, ['user_id'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
            AUTHOR
          </Paragraph>
        </SortingHeader>
      ),
      width: '15%',
      renderRow: (secret: any) => {
        return (
          <FlexBox alignItems="center">
            <div
              data-tip
              data-for={
                secret?.user?.full_name
                  ? secret?.user?.full_name
                  : secret?.user?.name
              }
            >
              <FlexBox alignItems="center">
                <Paragraph size="small">
                  {secret?.user?.full_name
                    ? secret?.user?.full_name
                    : secret?.user?.name}
                </Paragraph>
              </FlexBox>
            </div>
            <ReactTooltip
              id={
                secret?.user?.full_name
                  ? secret?.user?.full_name
                  : secret?.user?.name
              }
              place="top"
              effect="solid"
            >
              <Paragraph color="white">
                {secret?.user?.full_name
                  ? secret?.user?.full_name
                  : secret?.user?.name}
              </Paragraph>
            </ReactTooltip>
          </FlexBox>
        );
      },
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={filteredSecrets.length === 1 || expendedRow?.length === 1}
          sorting="created"
          sortMethod={sortMethod('created', {
            asc: (filteredSecrets: any[]) =>
              _.orderBy(
                filteredSecrets,
                (secret: any) => new Date(secret.created).getTime(),
                ['asc'],
              ),
            desc: (filteredSecrets: any[]) =>
              _.orderBy(
                filteredSecrets,
                (secret: any) => new Date(secret.created).getTime(),
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
      renderRow: (secret: any) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={formatDateToSort(secret.created)}>
            <FlexBox alignItems="center">
              {/* <Box paddingRight="sm">
                <icons.calendar color={iconColors.grey} size={iconSizes.sm} />
              </Box> */}
              <Paragraph color="grey" size="tiny">
                {formatDateToDisplayOnTable(secret.created)}
              </Paragraph>
            </FlexBox>
          </div>
          <ReactTooltip
            id={formatDateToSort(secret.created)}
            place="top"
            effect="solid"
          >
            <Paragraph color="white">
              {formatDateToDisplayOnTable(secret.created)}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
  ];
};
