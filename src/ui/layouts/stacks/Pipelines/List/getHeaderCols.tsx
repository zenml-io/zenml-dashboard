import React from 'react';
import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../../constants';
import { formatDateToDisplay, truncate } from '../../../../../utils';
import {
  Box,
  FlexBox,
  icons,
  LinkBox,
  Paragraph,
} from '../../../../components';
import { HeaderCol } from '../../../common/Table';
import { Status } from './Status';
import { WorkspaceName } from './WorkspaceName';
import { UserName } from './UserName';

export const getHeaderCols = ({
  openPipelineIds,
  setOpenPipelineIds,
}: {
  openPipelineIds: TId[];
  setOpenPipelineIds: (ids: TId[]) => void;
}): HeaderCol[] => {
  return [
    {
      width: '2%',
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
        <Paragraph size="small" color="grey">
          STACK NAME
        </Paragraph>
      ),
      width: '13%',
      renderRow: (pipeline: TPipeline) => (
        <Paragraph size="small">{pipeline.name}</Paragraph>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="grey">
          RUN ID
        </Paragraph>
      ),
      width: '15%',
      renderRow: (pipeline: TPipeline) => (
        <Paragraph size="small">
          {truncate(pipeline.id, ID_MAX_LENGTH)}
        </Paragraph>
      ),
    },

    {
      render: () => (
        <Paragraph size="small" color="grey">
          OWNER
        </Paragraph>
      ),
      width: '11%',
      renderRow: (pipeline: TPipeline) => (
        <Paragraph size="small">{pipeline.owner}</Paragraph>
      ),
    },
    {
      render: () => (
        <Paragraph size="small" color="grey">
          CREATED AT
        </Paragraph>
      ),
      width: '8%',
      renderRow: (pipeline: TPipeline) => (
        <FlexBox alignItems="center">
          <Box paddingRight="sm">
            <icons.calendar color={iconColors.grey} size={iconSizes.sm} />
          </Box>
          <Paragraph color="grey" size="tiny">
            {formatDateToDisplay(pipeline.createdAt)}
          </Paragraph>
        </FlexBox>
      ),
    },
  ];
};
