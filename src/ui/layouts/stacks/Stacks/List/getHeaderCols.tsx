import React from 'react';
import ReactTooltip from 'react-tooltip';
import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../../constants';
import {
  formatDateToDisplay,
  truncate,
  getInitialsFromEmail,
} from '../../../../../utils';
import {
  Box,
  FlexBox,
  ColoredCircle,
  icons,
  LinkBox,
  Paragraph,
} from '../../../../components';
import { HeaderCol } from '../../../common/Table';

// import { Status } from './Status';
// import { WorkspaceName } from './WorkspaceName';
// import { UserName } from './UserName';

export const getHeaderCols = ({
  openStackIds,
  setOpenStackIds,
}: {
  openStackIds: TId[];
  setOpenStackIds: (ids: TId[]) => void;
}): HeaderCol[] => {
  return [
    {
      width: '3%',
      renderRow: (stack: TStack) => (
        <LinkBox
          onClick={(e: Event) => {
            e.stopPropagation();
            if (openStackIds.indexOf(stack.id) === -1) {
              setOpenStackIds([...openStackIds, stack.id]);
            } else {
              setOpenStackIds(
                openStackIds.filter((id: TId) => id !== stack.id),
              );
            }
          }}
        >
          <FlexBox justifyContent="center">
            <icons.chevronDown color={iconColors.grey} size={iconSizes.sm} />
          </FlexBox>
        </LinkBox>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="black">
          ID
        </Paragraph>
      ),
      width: '8%',
      renderRow: (stack: TStack) => (
        // <Paragraph size="small">{truncate(stack.id, ID_MAX_LENGTH)}</Paragraph>
        <FlexBox alignItems="center">
          <div data-tip data-for={stack.id}>
            <Paragraph size="small">
              {truncate(stack.id, ID_MAX_LENGTH)}
            </Paragraph>
          </div>
          <ReactTooltip
            id={stack.id}
            place="top"
            effect="solid"
            // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
          >
            <Paragraph color="white">
              {stack.id}
              {/* {truncate(pipeline.id, ID_MAX_LENGTH)} */}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="black">
          NAME
        </Paragraph>
      ),
      width: '8%',
      renderRow: (stack: TStack) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={stack.name}>
            <Paragraph size="small" color="black">
              {stack.name}
            </Paragraph>
          </div>
          <ReactTooltip
            id={stack.name}
            place="top"
            effect="solid"
            // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
          >
            <Paragraph color="white">
              {stack.name}
              {/* {translate(`tooltips.${invoice.status}`)} */}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
        // <Paragraph
        //   size="small"
        //   color="black"
        //   // style={{ color: '#black', textDecoration: 'underline' }}
        // >
        //   {stack.name}
        // </Paragraph>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="black">
          SHARED
        </Paragraph>
      ),
      width: '8%',
      renderRow: (stack: TStack) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={stack.isShared}>
            <Box>
              <FlexBox
                justifyContent="center"
                style={{
                  borderRadius: '50%',
                  height: '19px',
                  width: '19px',
                  textAlign: 'center',
                }}
              >
                {stack.isShared ? (
                  <icons.multiUser
                    color={iconColors.white}
                    size={iconSizes.sm}
                  />
                ) : (
                  <icons.singleUser
                    color={iconColors.white}
                    size={iconSizes.sm}
                  />
                )}
              </FlexBox>
            </Box>
          </div>
          <ReactTooltip
            id={stack.isShared ? 'true' : 'false'}
            place="top"
            effect="solid"
            // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
          >
            <Paragraph color="white">
              {stack.isShared ? 'True' : 'False'}
              {/* {translate(`tooltips.${invoice.status}`)} */}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },

    {
      render: () => (
        <Paragraph size="small" color="black">
          OWNER
        </Paragraph>
      ),
      width: '11%',
      renderRow: (stack: TStack) => {
        const initials = getInitialsFromEmail(
          stack?.userName ? stack.userName : stack?.user?.name,
        );
        return (
          <FlexBox alignItems="center">
            <div
              data-tip
              data-for={
                stack.user.full_name ? stack.user.full_name : stack.user.name
              }
            >
              <FlexBox alignItems="center">
                <Box paddingRight="sm">
                  <ColoredCircle color="secondary" size="sm">
                    {initials}
                  </ColoredCircle>
                </Box>
                <Paragraph size="small">
                  {stack.user.full_name
                    ? stack.user.full_name
                    : stack.user.name}
                </Paragraph>
              </FlexBox>
            </div>
            <ReactTooltip
              id={stack.user.full_name ? stack.user.full_name : stack.user.name}
              place="top"
              effect="solid"
              // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
            >
              <Paragraph color="white">
                {stack.user.full_name ? stack.user.full_name : stack.user.name}
                {/* {translate(`tooltips.${invoice.status}`)} */}
              </Paragraph>
            </ReactTooltip>
          </FlexBox>
        );
      },
    },
    {
      render: () => (
        <Paragraph size="small" color="black">
          CREATED AT
        </Paragraph>
      ),
      width: '8%',
      renderRow: (stack: TStack) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={formatDateToDisplay(stack.created)}>
            <FlexBox alignItems="center">
              <Box paddingRight="sm">
                <icons.calendar color={iconColors.grey} size={iconSizes.sm} />
              </Box>
              <Paragraph color="grey" size="tiny">
                {formatDateToDisplay(stack.created)}
              </Paragraph>
            </FlexBox>
          </div>
          <ReactTooltip
            id={formatDateToDisplay(stack.created)}
            place="top"
            effect="solid"
            // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
          >
            <Paragraph color="white">
              {stack.created}
              {/* {translate(`tooltips.${invoice.status}`)} */}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
  ];
};
