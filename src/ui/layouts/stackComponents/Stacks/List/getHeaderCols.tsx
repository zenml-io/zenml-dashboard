import React from 'react';
import ReactTooltip from 'react-tooltip';
import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../../constants';
import {
  formatDateToDisplay,
  truncate,
  getInitialsFromEmail,
  formatDateToSort,
} from '../../../../../utils';
import {
  Box,
  FlexBox,
  icons,
  Paragraph,
  ColoredCircle,
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
      width: '2%',
      renderRow: (stackComponent: TStack) => <></>,
    },

    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '12px' }}>
          ID
        </Paragraph>
      ),
      width: '15%',
      renderRow: (stackComponent: TStack) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={stackComponent.id}>
            <Paragraph size="small">
              {truncate(stackComponent.id, ID_MAX_LENGTH)}
            </Paragraph>
          </div>
          <ReactTooltip
            id={stackComponent.id}
            place="top"
            effect="solid"
            // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
          >
            <Paragraph color="white">
              {stackComponent.id}
              {/* {truncate(pipeline.id, ID_MAX_LENGTH)} */}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '12px' }}>
          NAME
        </Paragraph>
      ),
      width: '15%',
      renderRow: (stackComponent: TStack) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={stackComponent.name}>
            <Paragraph size="small" color="black">
              {stackComponent.name}
            </Paragraph>
          </div>
          <ReactTooltip
            id={stackComponent.name}
            place="top"
            effect="solid"
            // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
          >
            <Paragraph color="white">
              {stackComponent.name}
              {/* {translate(`tooltips.${invoice.status}`)} */}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
        // <Paragraph size="small">{stackComponent.name}</Paragraph>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '12px' }}>
          FLAVOR
        </Paragraph>
      ),
      width: '15%',
      renderRow: (stackComponent: TStack) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={stackComponent.flavor}>
            <Paragraph size="small" color="black">
              {stackComponent.flavor}
            </Paragraph>
          </div>
          <ReactTooltip
            id={stackComponent.flavor}
            place="top"
            effect="solid"
            // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
          >
            <Paragraph color="white">
              {stackComponent.flavor}
              {/* {translate(`tooltips.${invoice.status}`)} */}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
        // <Paragraph size="small">{stackComponent.flavor}</Paragraph>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '12px' }}>
          SHARED
        </Paragraph>
      ),
      width: '15%',
      renderRow: (stackComponent: TStack) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={stackComponent.isShared}>
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
                {stackComponent.isShared ? (
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
            id={stackComponent.isShared ? 'true' : 'false'}
            place="top"
            effect="solid"
            // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
          >
            <Paragraph color="white">
              {stackComponent.isShared ? 'True' : 'False'}
              {/* {translate(`tooltips.${invoice.status}`)} */}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '12px' }}>
          AUTHOR
        </Paragraph>
      ),
      width: '15%',
      renderRow: (stackComponent: TStack) => {
        const initials = getInitialsFromEmail(
          stackComponent.user.full_name
            ? stackComponent.user.full_name
            : stackComponent.user.name,
        );
        return (
          <FlexBox alignItems="center">
            <div
              data-tip
              data-for={
                stackComponent.user.full_name
                  ? stackComponent.user.full_name
                  : stackComponent.user.name
              }
            >
              <FlexBox alignItems="center">
                <Box paddingRight="sm">
                  <ColoredCircle color="secondary" size="sm">
                    {initials}
                  </ColoredCircle>
                </Box>
                <Paragraph size="small">
                  {stackComponent.user.full_name
                    ? stackComponent.user.full_name
                    : stackComponent.user.name}
                </Paragraph>
              </FlexBox>
            </div>
            <ReactTooltip
              id={
                stackComponent.user.full_name
                  ? stackComponent.user.full_name
                  : stackComponent.user.name
              }
              place="top"
              effect="solid"
              // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
            >
              <Paragraph color="white">
                {stackComponent.user.full_name
                  ? stackComponent.user.full_name
                  : stackComponent.user.name}
                {/* {translate(`tooltips.${invoice.status}`)} */}
              </Paragraph>
            </ReactTooltip>
          </FlexBox>
        );
      },
    },
    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '12px' }}>
          CREATED AT
        </Paragraph>
      ),
      width: '15%',
      renderRow: (stackComponent: TStack) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={formatDateToSort(stackComponent.created)}>
            <FlexBox alignItems="center">
              <Box paddingRight="sm">
                <icons.calendar color={iconColors.grey} size={iconSizes.sm} />
              </Box>
              <Paragraph color="grey" size="tiny">
                {formatDateToDisplay(stackComponent.created)}
              </Paragraph>
            </FlexBox>
          </div>
          <ReactTooltip
            id={formatDateToSort(stackComponent.created)}
            place="top"
            effect="solid"
            // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
          >
            <Paragraph color="white">
              {stackComponent.created}
              {/* {translate(`tooltips.${invoice.status}`)} */}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
  ];
};
