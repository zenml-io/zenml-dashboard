import React from 'react';
import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../constants';
import {
  truncate,
  formatDateToSort,
  formatDateToDisplayOnTable,
} from '../../../../utils';
import { Box, FlexBox, icons, Paragraph, Tooltip } from '../../../components';
import { HeaderCol } from '../../common/Table';

export const GetHeaderCols = ({
  filteredConnector,
}: {
  filteredConnector: any[];
}): HeaderCol[] => {
  return [
    {
      render: () => (
        <Paragraph
          size="small"
          color="black"
          style={{ fontSize: '14px', marginLeft: '33px' }}
        >
          ID
        </Paragraph>
      ),
      width: '10%',
      renderRow: (connector: any) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={connector.id}>
            <FlexBox.Row style={{ alignItems: 'center' }}>
              <icons.chevronDown color={iconColors.grey} size={iconSizes.xs} />

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
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          Name
        </Paragraph>
      ),
      width: '20%',
      renderRow: (connector: any) => (
        <>
          {connector.name && (
            <FlexBox alignItems="center">
              <div data-tip data-for={connector.name}>
                <Paragraph size="small" color="black">
                  {connector.name}
                </Paragraph>
              </div>
              <Tooltip id={connector.name} text={connector.name} />
            </FlexBox>
          )}
        </>
      ),
    },
    {
      render: () => (
        <Box>
          <Paragraph size="small" color="black">
            Connector type
          </Paragraph>
        </Box>
      ),
      width: '10%',
      renderRow: (connector: any) => (
        <FlexBox alignItems="center">
          <Box marginLeft="sm">
            <div data-tip data-for={connector.metadata.connector_type.name}>
              <FlexBox alignItems="center">
                <img
                  alt={connector.metadata.connector_type.logo_url}
                  src={connector.metadata.connector_type.logo_url}
                  style={{
                    height: '28px',
                    width: '28px',
                  }}
                />
              </FlexBox>
            </div>
            <Tooltip
              id={connector.metadata.connector_type.name}
              text={connector.metadata.connector_type.name}
            />
          </Box>
        </FlexBox>
      ),
    },
    {
      render: () => (
        <Box>
          <Paragraph size="small" color="black">
            Resource types
          </Paragraph>
        </Box>
      ),
      width: '10%',
      renderRow: (connector: any) => (
        <FlexBox alignItems="center">
          {connector.metadata?.connector_type?.resource_types?.map((e: any) => (
            <Box key={e.name} marginLeft="sm">
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
          ))}
        </FlexBox>
      ),
    },

    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          Resource Name
        </Paragraph>
      ),
      width: '10%',
      renderRow: (connector: any) => {
        return (
          <FlexBox alignItems="center">
            <div data-tip data-for={connector.metadata.resource_id}>
              <Paragraph size="small" color="black">
                {connector.metadata.resource_id}
              </Paragraph>
            </div>
            <Tooltip
              id={connector.metadata.resource_id}
              text={connector.metadata.resource_id}
            />
          </FlexBox>
        );
      },
    },
    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          Authentication
        </Paragraph>
      ),
      width: '10%',
      renderRow: (connector: any) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={connector.metadata.auth_method}>
            <Paragraph size="small" color="black">
              {connector.metadata.auth_method}
            </Paragraph>
          </div>
          <Tooltip
            id={connector.metadata.auth_method}
            text={connector.metadata.auth_method}
          />
        </FlexBox>
      ),
    },

    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          Author
        </Paragraph>
      ),
      width: '10%',
      renderRow: (connector: any) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={connector.body.user.name}>
            <Paragraph size="small" color="black">
              {connector.body.user.name}
            </Paragraph>
          </div>
          <Tooltip
            id={connector.body.user.name}
            text={connector.body.user.name}
          />
        </FlexBox>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          Created
        </Paragraph>
      ),
      width: '10%',
      renderRow: (connector: any) => (
        <>
          {connector.created && (
            <FlexBox alignItems="center">
              <div data-tip data-for={formatDateToSort(connector.body.created)}>
                <FlexBox alignItems="center">
                  <Paragraph color="grey" size="tiny">
                    {formatDateToDisplayOnTable(connector.body.created)}
                  </Paragraph>
                </FlexBox>
              </div>
              <Tooltip
                id={formatDateToSort(connector.body.created)}
                text={formatDateToDisplayOnTable(connector.body.created)}
              />
            </FlexBox>
          )}
        </>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          Shared
        </Paragraph>
      ),
      width: '10%',
      renderRow: (connector: any) => (
        <FlexBox alignItems="center">
          <Box paddingRight="sm">
            {connector.body.is_shared && (
              <icons.lock2 color={iconColors.grey} size={iconSizes.sm} />
            )}
          </Box>
        </FlexBox>
      ),
    },
  ];
};
