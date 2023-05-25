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
  openConnectorIds,
  setOpenConnectorIds,
  filteredConnectors,
  setFilteredConnectors,
  activeSorting,
  activeSortingDirection,
  setActiveSortingDirection,
  setActiveSorting,
}: {
  expendedRow?: any;
  openConnectorIds: TId[];
  setOpenConnectorIds: (ids: TId[]) => void;
  filteredConnectors: any[];
  setFilteredConnectors: (secrets: any[]) => void;
  activeSorting: Sorting | null;
  activeSortingDirection: SortingDirection | null;
  setActiveSortingDirection: (direction: SortingDirection | null) => void;
  setActiveSorting: (sorting: Sorting | null) => void;
}): HeaderCol[] => {
  const { sortMethod } = useService({
    setActiveSortingDirection,
    setActiveSorting,
    setFilteredConnectors,
    activeSorting,
    activeSortingDirection,
    filteredConnectors,
  });

  return [
    // {
    //   width: '3%',
    //   renderRow: (connector: any) => (
    //     <LinkBox
    //       onClick={(e: Event) => {
    //         setToggle(!toggle);
    //         e.stopPropagation();
    //         if (openConnectorIds.indexOf(connector.id) === -1) {
    //           setOpensecretIds([...openConnectorIds, connector.id]);
    //         } else {
    //           setOpensecretIds(
    //             openConnectorIds.filter((id: TId) => id !== connector.id),
    //           );
    //         }
    //       }}
    //     >
    //       <FlexBox
    //         justifyContent="center"
    //         style={{ paddingTop: '5px', paddingBottom: '5px' }}
    //       >
    //         {openConnectorIds.indexOf(connector.id) === -1 ? (
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
          onlyOneRow={
            filteredConnectors.length === 1 || expendedRow?.length === 1
          }
          sorting="id"
          sortMethod={sortMethod('id', {
            asc: (filteredConnectors: any[]) =>
              _.orderBy(filteredConnectors, ['id'], ['asc']),
            desc: (filteredConnectors: any[]) =>
              _.orderBy(filteredConnectors, ['id'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph
            size="small"
            color="black"
            style={{ fontSize: '14px', marginLeft: '33px' }}
          >
            ID
          </Paragraph>
        </SortingHeader>
      ),
      width: '10%',
      renderRow: (connector: any) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={connector.id}>
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
                {truncate(connector.id, ID_MAX_LENGTH)}
              </Paragraph>
            </FlexBox.Row>
          </div>
          <ReactTooltip id={connector.id} place="top" effect="solid">
            <Paragraph color="white">{connector.id}</Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={
            filteredConnectors.length === 1 || expendedRow?.length === 1
          }
          sorting="name"
          sortMethod={sortMethod('name', {
            asc: (filteredConnectors: any[]) =>
              _.orderBy(filteredConnectors, ['name'], ['asc']),
            desc: (filteredConnectors: any[]) =>
              _.orderBy(filteredConnectors, ['name'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
            NAME
          </Paragraph>
        </SortingHeader>
      ),
      width: '20%',
      renderRow: (connector: any) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={connector.name}>
            <Paragraph size="small" color="black">
              {connector.name}
            </Paragraph>
          </div>
          <ReactTooltip id={connector.name} place="top" effect="solid">
            <Paragraph color="white">{connector.name}</Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={
            filteredConnectors.length === 1 || expendedRow?.length === 1
          }
          sorting="scope"
          sortMethod={sortMethod('scope', {
            asc: (filteredConnectors: any[]) =>
              _.orderBy(filteredConnectors, ['scope'], ['asc']),
            desc: (filteredConnectors: any[]) =>
              _.orderBy(filteredConnectors, ['scope'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Box style={{}}>
            <Paragraph size="small" color="black">
              Connector Type
            </Paragraph>
          </Box>
        </SortingHeader>
      ),
      width: '10%',
      renderRow: (connector: any) => (
        <FlexBox alignItems="center">
          {/* {connector?.connectorType?.map((e: any) => ( */}
          <Box marginLeft="sm">
            <div data-tip data-for={connector?.connectorType?.name}>
              <FlexBox alignItems="center">
                <img
                  alt={connector?.connectorType?.logo_url}
                  src={connector?.connectorType?.logo_url}
                  style={{
                    height: '28px',
                    width: '28px',
                  }}
                />
              </FlexBox>
            </div>
            <ReactTooltip
              id={connector?.connectorType?.name}
              place="top"
              effect="solid"
            >
              <Paragraph color="white">
                {connector?.connectorType?.name}
              </Paragraph>
            </ReactTooltip>
          </Box>
        </FlexBox>
      ),
    },

    {
      render: () => (
        <SortingHeader
          onlyOneRow={
            filteredConnectors.length === 1 || expendedRow?.length === 1
          }
          sorting="user_id"
          sortMethod={sortMethod('user_id', {
            asc: (filteredConnectors: any[]) =>
              _.orderBy(filteredConnectors, ['user_id'], ['asc']),
            desc: (filteredConnectors: any[]) =>
              _.orderBy(filteredConnectors, ['user_id'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
            Resource Types
          </Paragraph>
        </SortingHeader>
      ),
      width: '10%',
      renderRow: (connector: any) => {
        return (
          <FlexBox alignItems="center">
            {connector?.connectorType?.resource_types?.map((e: any) => (
              <Box marginLeft="sm">
                <div data-tip data-for={e?.name}>
                  <FlexBox alignItems="center">
                    <img
                      alt={e?.logo_url}
                      src={e?.logo_url}
                      style={{
                        height: '28px',
                        width: '28px',
                      }}
                    />
                  </FlexBox>
                </div>
                <ReactTooltip id={e?.name} place="top" effect="solid">
                  <Paragraph color="white">{e?.name}</Paragraph>
                </ReactTooltip>
              </Box>
            ))}
          </FlexBox>
        );
      },
    },

    {
      render: () => (
        <SortingHeader
          onlyOneRow={
            filteredConnectors.length === 1 || expendedRow?.length === 1
          }
          sorting="name"
          sortMethod={sortMethod('name', {
            asc: (filteredConnectors: any[]) =>
              _.orderBy(filteredConnectors, ['name'], ['asc']),
            desc: (filteredConnectors: any[]) =>
              _.orderBy(filteredConnectors, ['name'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
            Resource ID
          </Paragraph>
        </SortingHeader>
      ),
      width: '10%',
      renderRow: (connector: any) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={connector.resourceId}>
            <Paragraph size="small" color="black">
              {connector.resourceId}
            </Paragraph>
          </div>
          <ReactTooltip id={connector.resourceId} place="top" effect="solid">
            <Paragraph color="white">{connector.resourceId}</Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={
            filteredConnectors.length === 1 || expendedRow?.length === 1
          }
          sorting="name"
          sortMethod={sortMethod('name', {
            asc: (filteredConnectors: any[]) =>
              _.orderBy(filteredConnectors, ['name'], ['asc']),
            desc: (filteredConnectors: any[]) =>
              _.orderBy(filteredConnectors, ['name'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
            Authentication
          </Paragraph>
        </SortingHeader>
      ),
      width: '10%',
      renderRow: (connector: any) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={connector.authMethod}>
            <Paragraph size="small" color="black">
              {connector.authMethod}
            </Paragraph>
          </div>
          <ReactTooltip id={connector.authMethod} place="top" effect="solid">
            <Paragraph color="white">{connector.authMethod}</Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={
            filteredConnectors.length === 1 || expendedRow?.length === 1
          }
          sorting="name"
          sortMethod={sortMethod('name', {
            asc: (filteredConnectors: any[]) =>
              _.orderBy(filteredConnectors, ['name'], ['asc']),
            desc: (filteredConnectors: any[]) =>
              _.orderBy(filteredConnectors, ['name'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
            Author
          </Paragraph>
        </SortingHeader>
      ),
      width: '10%',
      renderRow: (connector: any) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={connector.user.name}>
            <Paragraph size="small" color="black">
              {connector.user.name}
            </Paragraph>
          </div>
          <ReactTooltip id={connector.user.name} place="top" effect="solid">
            <Paragraph color="white">{connector.user.name}</Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },

    {
      render: () => (
        <SortingHeader
          onlyOneRow={
            filteredConnectors.length === 1 || expendedRow?.length === 1
          }
          sorting="created"
          sortMethod={sortMethod('created', {
            asc: (filteredConnectors: any[]) =>
              _.orderBy(
                filteredConnectors,
                (connector: any) => new Date(connector.created).getTime(),
                ['asc'],
              ),
            desc: (filteredConnectors: any[]) =>
              _.orderBy(
                filteredConnectors,
                (connector: any) => new Date(connector.created).getTime(),
                ['desc'],
              ),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
            Created
          </Paragraph>
        </SortingHeader>
      ),
      width: '10%',
      renderRow: (connector: any) => (
        <>
          {connector.created && (
            <FlexBox alignItems="center">
              <div data-tip data-for={formatDateToSort(connector.created)}>
                <FlexBox alignItems="center">
                  <Paragraph color="grey" size="tiny">
                    {formatDateToDisplayOnTable(connector.created)}
                  </Paragraph>
                </FlexBox>
              </div>
              <ReactTooltip
                id={formatDateToSort(connector.created)}
                place="top"
                effect="solid"
              >
                <Paragraph color="white">
                  {formatDateToDisplayOnTable(connector.created)}
                </Paragraph>
              </ReactTooltip>
            </FlexBox>
          )}
        </>
      ),
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={
            filteredConnectors.length === 1 || expendedRow?.length === 1
          }
          sorting="created"
          sortMethod={sortMethod('created', {
            asc: (filteredConnectors: any[]) =>
              _.orderBy(
                filteredConnectors,
                (connector: any) => new Date(connector.created).getTime(),
                ['asc'],
              ),
            desc: (filteredConnectors: any[]) =>
              _.orderBy(
                filteredConnectors,
                (connector: any) => new Date(connector.created).getTime(),
                ['desc'],
              ),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
            Shared
          </Paragraph>
        </SortingHeader>
      ),
      width: '10%',
      renderRow: (connector: any) => (
        <FlexBox alignItems="center">
          <Box paddingRight="sm">
            {connector.isShared ? (
              <icons.lock2 color={iconColors.grey} size={iconSizes.sm} />
            ) : (
              <icons.lock2 color={iconColors.grey} size={iconSizes.sm} />
            )}
          </Box>
        </FlexBox>
      ),
    },
  ];
};
