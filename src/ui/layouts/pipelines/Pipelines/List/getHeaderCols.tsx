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
  icons,
  LinkBox,
  ColoredCircle,
  Paragraph,
} from '../../../../components';
import { HeaderCol } from '../../../common/Table';
import { Status } from './Status';
// import { WorkspaceName } from './WorkspaceName';
// import { UserName } from './UserName';

export const getHeaderCols = ({
  openPipelineIds,
  setOpenPipelineIds,
}: {
  openPipelineIds: TId[];
  setOpenPipelineIds: (ids: TId[]) => void;
}): HeaderCol[] => {
  return [
    {
      width: '3%',
      renderRow: (pipeline: TPipeline) => (
        <LinkBox
          onClick={(e: Event) => {
            e.stopPropagation();
            if (openPipelineIds.indexOf(pipeline.id) === -1) {
              setOpenPipelineIds([...openPipelineIds, pipeline.id]);
            } else {
              setOpenPipelineIds(
                openPipelineIds.filter((id: TId) => id !== pipeline.id),
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
      renderRow: (pipeline: TPipeline) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={pipeline.id}>
            <Paragraph size="small">
              {truncate(pipeline.id, ID_MAX_LENGTH)}
            </Paragraph>
          </div>
          <ReactTooltip
            id={pipeline.id}
            place="top"
            effect="solid"
            // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
          >
            <Paragraph color="white">
              {pipeline.id}
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
      renderRow: (pipeline: TPipeline) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={pipeline.name}>
            <Paragraph size="small">{pipeline.name}</Paragraph>
          </div>
          <ReactTooltip
            id={pipeline.name}
            place="top"
            effect="solid"
            // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
          >
            <Paragraph color="white">
              {pipeline.name}
              {/* {translate(`tooltips.${invoice.status}`)} */}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
        //
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="black">
          STATUS
        </Paragraph>
      ),
      width: '8%',
      renderRow: (pipeline: TPipeline) => <Status pipeline={pipeline} />,
    },

    {
      render: () => (
        <Paragraph size="small" color="black">
          OWNER
        </Paragraph>
      ),
      width: '11%',
      renderRow: (pipeline: TPipeline) => {
        const initials = getInitialsFromEmail(
          pipeline.user.full_name
            ? pipeline.user.full_name
            : pipeline.user.name,
        );
        return (
          <FlexBox alignItems="center">
            <div
              data-tip
              data-for={
                pipeline.user.full_name
                  ? pipeline.user.full_name
                  : pipeline.user.name
              }
            >
              <FlexBox alignItems="center">
                <Box paddingRight="sm">
                  <ColoredCircle color="secondary" size="sm">
                    {initials}
                  </ColoredCircle>
                </Box>
                <Paragraph size="small">
                  {pipeline.user.full_name
                    ? pipeline.user.full_name
                    : pipeline.user.name}
                </Paragraph>
              </FlexBox>
            </div>
            <ReactTooltip
              id={
                pipeline.user.full_name
                  ? pipeline.user.full_name
                  : pipeline.user.name
              }
              place="top"
              effect="solid"
              // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
            >
              <Paragraph color="white">
                {pipeline.user.full_name
                  ? pipeline.user.full_name
                  : pipeline.user.name}
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
      renderRow: (pipeline: TPipeline) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={formatDateToDisplay(pipeline.created)}>
            <FlexBox alignItems="center">
              <Box paddingRight="sm">
                <icons.calendar color={iconColors.grey} size={iconSizes.sm} />
              </Box>
              <Paragraph color="grey" size="tiny">
                {formatDateToDisplay(pipeline.created)}
              </Paragraph>
            </FlexBox>
          </div>
          <ReactTooltip
            id={formatDateToDisplay(pipeline.created)}
            place="top"
            effect="solid"
            // backgroundColor={getBGColorFromInvoiceStatus(invoice.status)}
          >
            <Paragraph color="white">
              {pipeline.created}
              {/* {translate(`tooltips.${invoice.status}`)} */}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
  ];
};
