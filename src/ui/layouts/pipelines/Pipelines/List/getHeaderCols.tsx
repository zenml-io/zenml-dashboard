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
        <Paragraph size="small" color="black">Pipeline</Paragraph>
      ),
      width: '13%',
      renderRow: (pipeline: TPipeline) => (
        <Paragraph size="small">{pipeline.name}</Paragraph>
      ),
    },


    {      
      render: () => (
        <Paragraph size="small" color="black">Pipeline ID</Paragraph>
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
        <Paragraph size="small" color="black">Shared</Paragraph>
      ),
      width: '10%',
      renderRow: (pipeline: TPipeline) => (
        <Box>
          <FlexBox justifyContent='center' style={{ backgroundColor: pipeline.isShared ? '#431D93' : '#FF5C93', borderRadius: '50%', height: '25px', width: '25px', paddingTop: '3px', textAlign: 'center' }}>
            {pipeline.isShared ? <icons.check color={iconColors.white} size={iconSizes.sm} /> : <icons.close color={iconColors.white} size={iconSizes.sm} />} 
          </FlexBox>    
        </Box>
      ) 
    },
    // {
    //   width: '16%',
    //   renderRow: (pipeline: TPipeline) => <WorkspaceName pipeline={pipeline} />,
    // },
    {
      render: () => (
        <Paragraph size="small" color="black">Author</Paragraph>
      ),
      width: '11%',
      renderRow: (pipeline: TPipeline) => <UserName pipeline={pipeline} />,
    },
    {
      render: () => (
        <Paragraph size="small" color="black">Created At</Paragraph>
      ),
      width: '8%',
      renderRow: (pipeline: TPipeline) => (
        <FlexBox alignItems="center">
          <Box paddingRight="sm">
            <icons.calendar color={iconColors.grey} size={iconSizes.sm} />
          </Box>
          <Paragraph color="black" size="tiny">
            {formatDateToDisplay(pipeline.creationDate)}
          </Paragraph>
        </FlexBox>
      ),
    },
  ];
};
