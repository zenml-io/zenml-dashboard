import _ from 'lodash';
import React, { useState } from 'react';
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

export const GetHeaderCols = ({
  expendedRow,
  filteredConnectors,
  setFilteredConnectors,
  activeSorting,
  activeSortingDirection,
  setActiveSortingDirection,
  setActiveSorting,
}: {
  expendedRow?: any;
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

  const [showResourceTypes, setShowResourceTypes] = useState(false);
  const [connectorId, setConnectorId] = useState('');

  return [
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
      testId: 'Id',
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
          <Tooltip id={connector.id} text={connector.id} />
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
      testId: 'Name',
      width: '20%',
      renderRow: (connector: any) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={connector.name}>
            <Paragraph size="small" color="black">
              {connector.name}
            </Paragraph>
          </div>
          <Tooltip id={connector.name} text={connector.name} />
        </FlexBox>
      ),
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={
            filteredConnectors.length === 1 || expendedRow?.length === 1
          }
          sorting="connector_type"
          sortMethod={sortMethod('connector_type', {
            asc: (filteredConnectors: any[]) =>
              _.orderBy(filteredConnectors, ['connector_type'], ['asc']),
            desc: (filteredConnectors: any[]) =>
              _.orderBy(filteredConnectors, ['connector_type'], ['desc']),
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
      testId: 'connector_type',
      width: '10%',
      renderRow: (connector: any) => (
        <FlexBox alignItems="center">
          <Box marginLeft="sm">
            <div data-tip data-for={connector.connectorType.name}>
              <FlexBox alignItems="center">
                <img
                  alt={connector.connectorType.logo_url}
                  src={connector.connectorType.logo_url}
                  style={{
                    height: '28px',
                    width: '28px',
                  }}
                />
              </FlexBox>
            </div>
            <Tooltip
              id={connector.connectorType.name}
              text={connector.connectorType.name}
            />
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
          sorting="resource_type"
          sortMethod={sortMethod('resource_type', {
            asc: (filteredConnectors: any[]) =>
              _.orderBy(filteredConnectors, ['resource_type'], ['asc']),
            desc: (filteredConnectors: any[]) =>
              _.orderBy(filteredConnectors, ['resource_type'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
            Resource Types
          </Paragraph>
        </SortingHeader>
      ),
      testId: 'resource_types',
      width: '10%',
      renderRow: (connector: any) => {
        const filteredResourceTypes: Array<any> = connector?.connectorType?.resource_types?.filter(
          (e: any) => {
            if (connector.resourceTypes.includes(e.resource_type)) return e;
          },
        );

        return (
          <FlexBox alignItems="center">
            {filteredResourceTypes?.slice(0, 2)?.map(
              (e: any, index: number) =>
                connector.resourceTypes.includes(e.resource_type) && (
                  <Box key={index} marginLeft={index !== 0 ? 'sm' : null}>
                    <div data-tip data-for={e.name}>
                      <FlexBox alignItems="center">
                        <img
                          alt={e.logo_url}
                          src={e.logo_url}
                          style={{
                            height: '28px',
                            width: '28px',
                          }}
                        />
                      </FlexBox>
                    </div>
                    <Tooltip id={e.name} text={e.name} />
                  </Box>
                ),
            )}

            {filteredResourceTypes?.length > 2 && (
              <Box marginLeft="sm" onClick={(e) => e.stopPropagation()}>
                <FlexBox
                  alignItems="center"
                  justifyContent="center"
                  onClick={() => {
                    setShowResourceTypes(!showResourceTypes);
                    setConnectorId(connector?.id);
                  }}
                  style={{
                    height: '28px',
                    width: '28px',
                    border: '1.5px solid #424240',
                    borderRadius: '100%',
                    cursor: 'pointer',
                  }}
                >
                  <Paragraph>+{filteredResourceTypes?.length - 2}</Paragraph>
                </FlexBox>

                {showResourceTypes && connectorId === connector?.id && (
                  <FlexBox
                    padding="sm"
                    alignItems="center"
                    justifyContent="center"
                    style={{
                      marginTop: '5px',
                      backgroundColor: '#fff',
                      position: 'absolute',
                      border: '1px solid #e9eaec',
                      borderRadius: '4px',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
                      zIndex: 100,
                    }}
                  >
                    {filteredResourceTypes
                      ?.slice(2)
                      ?.map((e: any, index: number) => (
                        <Box key={index} marginLeft={index !== 0 ? 'sm' : null}>
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
                          <Tooltip id={e?.name} text={e?.name} />
                        </Box>
                      ))}
                  </FlexBox>
                )}
              </Box>
            )}
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
          sorting="resource_id"
          sortMethod={sortMethod('resource_id', {
            asc: (filteredConnectors: any[]) =>
              _.orderBy(filteredConnectors, ['resource_id'], ['asc']),
            desc: (filteredConnectors: any[]) =>
              _.orderBy(filteredConnectors, ['resource_id'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
            Resource ID
          </Paragraph>
        </SortingHeader>
      ),
      testId: 'resource_id',
      width: '10%',
      renderRow: (connector: any) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={connector.resourceId}>
            <Paragraph size="small" color="black">
              {connector.resourceId}
            </Paragraph>
          </div>
          <Tooltip id={connector.resourceId} text={connector.resourceId} />
        </FlexBox>
      ),
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={
            filteredConnectors.length === 1 || expendedRow?.length === 1
          }
          sorting="auth_method"
          sortMethod={sortMethod('auth_method', {
            asc: (filteredConnectors: any[]) =>
              _.orderBy(filteredConnectors, ['auth_method'], ['asc']),
            desc: (filteredConnectors: any[]) =>
              _.orderBy(filteredConnectors, ['auth_method'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
            Authentication
          </Paragraph>
        </SortingHeader>
      ),
      testId: 'Authentication',
      width: '10%',
      renderRow: (connector: any) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={connector.authMethod}>
            <Paragraph size="small" color="black">
              {connector.authMethod}
            </Paragraph>
          </div>
          <Tooltip id={connector.authMethod} text={connector.authMethod} />
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
            Author
          </Paragraph>
        </SortingHeader>
      ),
      testId: 'Author',
      width: '10%',
      renderRow: (connector: any) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={connector.user.name}>
            <Paragraph size="small" color="black">
              {connector.user.name}
            </Paragraph>
          </div>
          <Tooltip id={connector.user.name} text={connector.user.name} />
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
      testId: 'Created',
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
              <Tooltip
                id={formatDateToSort(connector.created)}
                text={formatDateToDisplayOnTable(connector.created)}
              />
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
          sorting="is_shared"
          sortMethod={sortMethod('is_shared', {
            asc: (filteredConnectors: any[]) =>
              _.orderBy(filteredConnectors, ['is_shared'], ['asc']),
            desc: (filteredConnectors: any[]) =>
              _.orderBy(filteredConnectors, ['is_shared'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
            Shared
          </Paragraph>
        </SortingHeader>
      ),
      testId: 'Shared',
      width: '10%',
      renderRow: (connector: any) => (
        <FlexBox alignItems="center">
          <Box paddingRight="sm">
            {connector.isShared && (
              <icons.lock2 color={iconColors.grey} size={iconSizes.sm} />
            )}
          </Box>
        </FlexBox>
      ),
    },
  ];
};
