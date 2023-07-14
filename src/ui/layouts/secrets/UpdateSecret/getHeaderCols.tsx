// import _ from 'lodash';
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
          <Tooltip id={secret.id} text={secret.id} />
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
          <Tooltip id={secret.name} text={secret.name} />
        </FlexBox>
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
      renderRow: (secret: any) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={secret.scope}>
            <Paragraph size="small" color="black">
              {secret.scope}
            </Paragraph>
          </div>
          <Tooltip id={secret.scope} text={secret.scope} />
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
            <Tooltip
              id={
                secret?.user?.full_name
                  ? secret.user?.full_name
                  : secret?.user?.name
              }
              text={
                secret?.user?.full_name
                  ? secret.user?.full_name
                  : secret?.user?.name
              }
            />
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
          <Tooltip
            id={formatDateToSort(secret.created)}
            text={formatDateToDisplayOnTable(secret.created)}
          />
        </FlexBox>
      ),
    },
  ];
};
