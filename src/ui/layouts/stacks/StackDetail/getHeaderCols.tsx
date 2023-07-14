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
  filteredStacks,
}: {
  expendedRow?: any;

  filteredStacks: TStack[];
}): HeaderCol[] => {
  return [
    // {
    //   width: '3%',
    //   renderRow: (stack: TStack) => (
    //     <LinkBox
    //       onClick={(e: Event) => {
    //         setToggle(!toggle);
    //         e.stopPropagation();
    //         if (openStackIds.indexOf(stack.id) === -1) {
    //           setOpenStackIds([...openStackIds, stack.id]);
    //         } else {
    //           setOpenStackIds(
    //             openStackIds.filter((id: TId) => id !== stack.id),
    //           );
    //         }
    //       }}
    //     >
    //       <FlexBox
    //         justifyContent="center"
    //         style={{ paddingTop: '5px', paddingBottom: '5px' }}
    //       >
    //         {openStackIds.indexOf(stack.id) === -1 ? (
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
      width: '20%',
      renderRow: (stack: TStack) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={stack.id}>
            <FlexBox.Row style={{ alignItems: 'center' }}>
              <icons.chevronDown color={iconColors.grey} size={iconSizes.xs} />

              <Paragraph size="small" style={{ marginLeft: '20px' }}>
                {truncate(stack.id, ID_MAX_LENGTH)}
              </Paragraph>
            </FlexBox.Row>
          </div>
          <Tooltip id={stack.id} text={stack.id} />
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
      renderRow: (stack: TStack) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={stack.name}>
            <Paragraph size="small" color="black">
              {stack.name}
            </Paragraph>
          </div>
          <Tooltip id={stack.name} text={stack.name} />
        </FlexBox>
      ),
    },
    {
      render: () => (
        <Box style={{ margin: '0 auto 0 auto', textAlign: 'center' }}>
          <Paragraph size="small" color="black" style={{ marginLeft: '-16px' }}>
            SHARED
          </Paragraph>
        </Box>
      ),
      width: '15%',
      renderRow: (stack: TStack) => (
        <FlexBox alignItems="center">
          <div
            style={{ margin: '0 auto 0 auto' }}
            data-tip
            data-for={stack.isShared}
          >
            <Box>
              <FlexBox
                justifyContent="center"
                style={{
                  borderRadius: '50%',
                  // height: '19px',
                  // width: '19px',
                  marginLeft: '-16px',
                  textAlign: 'center',
                }}
              >
                {stack.isShared ? (
                  <icons.multiUser
                    color={iconColors.white}
                    size={iconSizes.md}
                  />
                ) : (
                  <icons.singleUser
                    color={iconColors.white}
                    size={iconSizes.md}
                  />
                )}
              </FlexBox>
            </Box>
          </div>
          <Tooltip
            id={stack.isShared ? 'true' : 'false'}
            text={stack.isShared ? 'true' : 'false'}
          />
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
      renderRow: (stack: TStack) => {
        return (
          <FlexBox alignItems="center">
            <div
              data-tip
              data-for={
                stack?.user?.full_name
                  ? stack?.user?.full_name
                  : stack?.user?.name
              }
            >
              <FlexBox alignItems="center">
                <Paragraph size="small">
                  {stack?.user?.full_name
                    ? stack?.user?.full_name
                    : stack?.user?.name}
                </Paragraph>
              </FlexBox>
            </div>
            <Tooltip
              id={
                stack?.user?.full_name
                  ? stack?.user?.full_name
                  : stack?.user?.name
              }
              text={
                stack?.user?.full_name
                  ? stack?.user?.full_name
                  : stack?.user?.name
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
      renderRow: (stack: TStack) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={formatDateToSort(stack.created)}>
            <FlexBox alignItems="center">
              {/* <Box paddingRight="sm">
                <icons.calendar color={iconColors.grey} size={iconSizes.sm} />
              </Box> */}
              <Paragraph color="grey" size="tiny">
                {formatDateToDisplayOnTable(stack.created)}
              </Paragraph>
            </FlexBox>
          </div>
          <Tooltip
            id={formatDateToSort(stack.created)}
            text={formatDateToDisplayOnTable(stack.created)}
          />
        </FlexBox>
      ),
    },
  ];
};
