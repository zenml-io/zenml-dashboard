// import _ from 'lodash';
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
    // {
    //   width: '3%',
    //   renderRow: (connector: any) => (
    //     <LinkBox
    //       onClick={(e: Event) => {
    //         setToggle(!toggle);
    //         e.stopPropagation();
    //         if (opensecretIds.indexOf(connector.id) === -1) {
    //           setOpensecretIds([...opensecretIds, connector.id]);
    //         } else {
    //           setOpensecretIds(
    //             opensecretIds.filter((id: TId) => id !== connector.id),
    //           );
    //         }
    //       }}
    //     >
    //       <FlexBox
    //         justifyContent="center"
    //         style={{ paddingTop: '5px', paddingBottom: '5px' }}
    //       >
    //         {opensecretIds.indexOf(connector.id) === -1 ? (
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
        <>
          {connector.id && (
            <FlexBox alignItems="center">
              <div data-tip data-for={connector?.id}>
                <FlexBox.Row style={{ alignItems: 'center' }}>
                  <icons.chevronDown
                    color={iconColors.grey}
                    size={iconSizes.xs}
                  />

                  <Paragraph size="small" style={{ marginLeft: '20px' }}>
                    {truncate(connector.id, ID_MAX_LENGTH)}
                  </Paragraph>
                </FlexBox.Row>
              </div>
              <Tooltip id={connector.id} text={connector.id} />
            </FlexBox>
          )}
        </>
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
            <Tooltip
              id={connector.connectorType?.name}
              text={connector.connectorType?.name}
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
        const filteredResourceTypes = connector?.connectorType?.resource_types?.filter(
          (e: any) => {
            if (connector.resourceTypes.includes(e.resource_type)) return e;
          },
        );

        return (
          <FlexBox alignItems="center">
            {filteredResourceTypes.slice(0, 2)?.map(
              (e: any, index: number) =>
                connector.resourceTypes.includes(e.resource_type) && (
                  <Box marginLeft={index !== 0 ? 'sm' : null}>
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
                        <Box marginLeft={index !== 0 ? 'sm' : null}>
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
          Resource Name
        </Paragraph>
      ),
      width: '10%',
      renderRow: (connector: any) => {
        return (
          <FlexBox alignItems="center">
            <div data-tip data-for={connector.resourceId}>
              <Paragraph size="small" color="black">
                {connector.resourceId}
              </Paragraph>
            </div>
            <Tooltip id={connector.resourceId} text={connector.resourceId} />
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
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          Author
        </Paragraph>
      ),
      width: '10%',
      renderRow: (connector: any) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={connector?.user?.name}>
            <Paragraph size="small" color="black">
              {connector?.user?.name}
            </Paragraph>
          </div>
          <Tooltip id={connector.user?.name} text={connector.user?.name} />
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
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          Shared
        </Paragraph>
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
