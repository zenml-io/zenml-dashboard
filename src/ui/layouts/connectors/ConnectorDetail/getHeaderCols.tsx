// import _ from 'lodash';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../constants';
import {
  truncate,
  formatDateToSort,
  formatDateToDisplayOnTable,
} from '../../../../utils';
import { Box, FlexBox, icons, Paragraph } from '../../../components';
import { HeaderCol } from '../../common/Table';

export const GetHeaderCols = ({
  // expendedRow,
  filteredConnector,
}: {
  filteredConnector: any[];
}): HeaderCol[] => {
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
              <ReactTooltip id={connector.id} place="top" effect="solid">
                <Paragraph color="white">{connector.id}</Paragraph>
              </ReactTooltip>
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
              <ReactTooltip id={connector.name} place="top" effect="solid">
                <Paragraph color="white">{connector.name}</Paragraph>
              </ReactTooltip>
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
        <Box>
          <Paragraph size="small" color="black">
            Resource types
          </Paragraph>
        </Box>
      ),
      width: '10%',
      renderRow: (connector: any) => (
        <FlexBox alignItems="center">
          {connector?.connectorType.resource_types?.map((e: any) => (
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
            <div data-tip data-for={connector.resourceId}>
              <Paragraph size="small" color="black">
                {connector.resourceId}
              </Paragraph>
            </div>
            <ReactTooltip id={connector.resourceId} place="top" effect="solid">
              <Paragraph color="white">{connector.resourceId}</Paragraph>
            </ReactTooltip>
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
          <ReactTooltip id={connector.authMethod} place="top" effect="solid">
            <Paragraph color="white">{connector.authMethod}</Paragraph>
          </ReactTooltip>
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
          <ReactTooltip id={connector?.user?.name} place="top" effect="solid">
            <Paragraph color="white">{connector?.user?.name}</Paragraph>
          </ReactTooltip>
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
