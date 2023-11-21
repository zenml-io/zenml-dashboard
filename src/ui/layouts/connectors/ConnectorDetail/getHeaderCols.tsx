import React, { useState } from 'react';
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
  const [showResourceTypes, setShowResourceTypes] = useState(false);
  const [connectorId, setConnectorId] = useState('');

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
          <div data-tip data-for={connector?.id}>
            <FlexBox.Row style={{ alignItems: 'center' }}>
              <icons.chevronDown color={iconColors.grey} size={iconSizes.xs} />

              <Paragraph size="small" style={{ marginLeft: '20px' }}>
                {truncate(connector?.id, ID_MAX_LENGTH)}
              </Paragraph>
            </FlexBox.Row>
          </div>
          <Tooltip id={connector?.id} text={connector?.id} />
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
        <FlexBox alignItems="center">
          <div data-tip data-for={connector?.name}>
            <Paragraph size="small" color="black">
              {connector?.name}
            </Paragraph>
          </div>
          <Tooltip id={connector?.name} text={connector?.name} />
        </FlexBox>
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
            <div data-tip data-for={connector?.body?.connector_type?.name}>
              <FlexBox alignItems="center">
                <img
                  alt={connector?.body?.connector_type?.logo_url}
                  src={connector?.body?.connector_type?.logo_url}
                  style={{
                    height: '28px',
                    width: '28px',
                  }}
                />
              </FlexBox>
            </div>
            <Tooltip
              id={connector?.body?.connector_type?.name}
              text={connector?.body?.connector_type?.name}
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
      renderRow: (connector: any) => {
        const filteredResourceTypes: Array<any> = connector?.body?.connector_type?.resource_types?.filter(
          (e: any) => {
            if (connector?.body?.resource_types?.includes(e.resource_type))
              return e;
          },
        );

        return (
          <FlexBox alignItems="center">
            {filteredResourceTypes?.slice(0, 2)?.map(
              (e: any, index: number) =>
                connector?.body?.resource_types.includes(e?.resource_type) && (
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
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          Resource ID
        </Paragraph>
      ),
      width: '14%',
      renderRow: (connector: any) => {
        return (
          <FlexBox alignItems="center">
            <div data-tip data-for={connector?.body?.resource_id}>
              <Paragraph size="small" color="black">
                {connector?.body?.resource_id}
              </Paragraph>
            </div>
            <Tooltip
              id={connector?.body?.resource_id}
              text={connector?.body?.resource_id}
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
      width: '14%',
      renderRow: (connector: any) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={connector?.body?.auth_method}>
            <Paragraph size="small" color="black">
              {connector?.body?.auth_method}
            </Paragraph>
          </div>
          <Tooltip
            id={connector?.body?.auth_method}
            text={connector?.body?.auth_method}
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
          <div data-tip data-for={connector?.body?.user?.name}>
            <Paragraph size="small" color="black">
              {connector?.body?.user?.name}
            </Paragraph>
          </div>
          <Tooltip
            id={connector?.body?.user?.name}
            text={connector?.body?.user?.name}
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
      width: '12%',
      renderRow: (connector: any) => (
        <>
          {connector?.body?.created && (
            <FlexBox alignItems="center">
              <div
                data-tip
                data-for={formatDateToSort(connector?.body?.created)}
              >
                <FlexBox alignItems="center">
                  <Paragraph color="grey" size="tiny">
                    {formatDateToDisplayOnTable(connector?.body?.created)}
                  </Paragraph>
                </FlexBox>
              </div>
              <Tooltip
                id={formatDateToSort(connector?.body?.created)}
                text={formatDateToDisplayOnTable(connector?.body?.created)}
              />
            </FlexBox>
          )}
        </>
      ),
    },
    // {
    //   render: () => (
    //     <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
    //       Shared
    //     </Paragraph>
    //   ),
    //   width: '10%',
    //   renderRow: (connector: any) => (
    //     <FlexBox alignItems="center">
    //       <Box paddingRight="sm">
    //         {connector?.body?.isShared && (
    //           <icons.lock2 color={iconColors.grey} size={iconSizes.sm} />
    //         )}
    //       </Box>
    //     </FlexBox>
    //   ),
    // },
  ];
};
