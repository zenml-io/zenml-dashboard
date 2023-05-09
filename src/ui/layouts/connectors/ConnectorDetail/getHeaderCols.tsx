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
          CONNECTOR ID
        </Paragraph>
      ),
      width: '20%',
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
          NAME
        </Paragraph>
      ),
      width: '30%',
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
            SCOPE
          </Paragraph>
        </Box>
      ),
      width: '15%',
      renderRow: (connector: any) => (
        <>
          {connector.scope && (
            <FlexBox alignItems="center">
              <div data-tip data-for={connector.scope}>
                <Paragraph size="small" color="black">
                  {connector.scope}
                </Paragraph>
              </div>
              <ReactTooltip id={connector.scope} place="top" effect="solid">
                <Paragraph color="white">{connector.scope}</Paragraph>
              </ReactTooltip>
            </FlexBox>
          )}
        </>
      ),
    },

    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          AUTHOR
        </Paragraph>
      ),
      width: '15%',
      renderRow: (connector: any) => {
        return (
          <>
            {connector.user && (
              <FlexBox alignItems="center">
                <div
                  data-tip
                  data-for={
                    connector?.user?.full_name
                      ? connector?.user?.full_name
                      : connector?.user?.name
                  }
                >
                  <FlexBox alignItems="center">
                    <Paragraph size="small">
                      {connector?.user?.full_name
                        ? connector?.user?.full_name
                        : connector?.user?.name}
                    </Paragraph>
                  </FlexBox>
                </div>
                <ReactTooltip
                  id={
                    connector?.user?.full_name
                      ? connector?.user?.full_name
                      : connector?.user?.name
                  }
                  place="top"
                  effect="solid"
                >
                  <Paragraph color="white">
                    {connector?.user?.full_name
                      ? connector.user?.full_name
                      : connector?.user?.name}
                  </Paragraph>
                </ReactTooltip>
              </FlexBox>
            )}
          </>
        );
      },
    },
    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          CREATED AT
        </Paragraph>
      ),
      width: '20%',
      renderRow: (connector: any) => (
        <>
          {connector.created && (
            <FlexBox alignItems="center">
              <div data-tip data-for={formatDateToSort(connector.created)}>
                <FlexBox alignItems="center">
                  {/* <Box paddingRight="sm">
                <icons.calendar color={iconColors.grey} size={iconSizes.sm} />
              </Box> */}
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
  ];
};
