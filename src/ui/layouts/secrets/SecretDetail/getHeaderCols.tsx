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
  filteredSecret,
}: {
  filteredSecret: any[];
}): HeaderCol[] => {
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
        <Paragraph
          size="small"
          color="black"
          style={{ fontSize: '14px', marginLeft: '33px' }}
        >
          SECRET ID
        </Paragraph>
      ),
      width: '20%',
      renderRow: (secret: any) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={secret.id}>
            <FlexBox.Row style={{ alignItems: 'center' }}>
              <icons.chevronDown color={iconColors.grey} size={iconSizes.xs} />

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
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          NAME
        </Paragraph>
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
        <Box style={{ margin: '0 auto 0 auto', textAlign: 'center' }}>
          <Paragraph size="small" color="black" style={{ marginLeft: '-16px' }}>
            SCOPE
          </Paragraph>
        </Box>
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
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          AUTHOR
        </Paragraph>
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
                  ? secret.user?.full_name
                  : secret?.user?.name}
              </Paragraph>
            </ReactTooltip>
          </FlexBox>
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
