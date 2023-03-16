import React from 'react';
import ReactTooltip from 'react-tooltip';
import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../constants';
import { truncate, formatDateToDisplayOnTable } from '../../../../utils';
import {
  // Box,
  FlexBox,
  icons,
  // LinkBox,
  Paragraph,
} from '../../../components';
import { HeaderCol } from '../../common/Table';

// import _ from 'lodash';
import { Status } from '../Pipelines/List/Status';

export const GetHeaderCols = ({
  filteredPipelines,
}: {
  filteredPipelines: TPipeline[];
}): HeaderCol[] => {
  return [
    // {
    //   width: '3%',
    //   renderRow: (pipeline: TPipeline) => (
    //     <FlexBox
    //       justifyContent="center"
    //       style={{ paddingTop: '5px', paddingBottom: '5px' }}
    //     >
    //       {expendedRow?.length === 1 ? (
    //         <icons.chevronDown color={iconColors.grey} size={iconSizes.sm} />
    //       ) : (
    //         <icons.rightArrow color={iconColors.grey} size={iconSizes.sm} />
    //       )}
    //     </FlexBox>
    //     // <LinkBox
    //     //   style={{ padding: 0 }}
    //     //   onClick={(e: Event) => {
    //     //     e.stopPropagation();
    //     //     if (openPipelineIds.indexOf(pipeline.id) === -1) {
    //     //       setOpenPipelineIds([...openPipelineIds, pipeline.id]);
    //     //     } else {
    //     //       setOpenPipelineIds(
    //     //         openPipelineIds.filter((id: TId) => id !== pipeline.id),
    //     //       );
    //     //     }
    //     //   }}
    //     // >
    //     //   <FlexBox
    //     //     justifyContent="center"
    //     //     style={{ paddingTop: '5px', paddingBottom: '5px' }}
    //     //   >
    //     //     {openPipelineIds.indexOf(pipeline.id) === -1 ? (
    //     //       <icons.chevronDownLight
    //     //         color={iconColors.grey}
    //     //         size={iconSizes.sm}
    //     //       />
    //     //     ) : (
    //     //       <icons.chevronUpLight
    //     //         color={iconColors.grey}
    //     //         size={iconSizes.sm}
    //     //       />
    //     //     )}
    //     //   </FlexBox>
    //     // </LinkBox>
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
      width: '8%',
      renderRow: (pipeline: TPipeline) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={pipeline.id}>
            <FlexBox.Row style={{ alignItems: 'center' }}>
              <icons.chevronDown color={iconColors.grey} size={iconSizes.xs} />
              <Paragraph size="small" style={{ marginLeft: '20px' }}>
                {truncate(pipeline.id, ID_MAX_LENGTH)}
              </Paragraph>
            </FlexBox.Row>
          </div>
          <ReactTooltip id={pipeline.id} place="top" effect="solid">
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
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          NAME
        </Paragraph>
      ),
      width: '8%',
      renderRow: (pipeline: TPipeline) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={pipeline.name}>
            <Paragraph size="small">{pipeline.name}</Paragraph>
          </div>
          <ReactTooltip id={pipeline.name} place="top" effect="solid">
            <Paragraph color="white">
              {pipeline.name}
              {/* {translate(`tooltips.${invoice.status}`)} */}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
    {
      render: () => (
        <div style={{ margin: '0 auto 0 auto', textAlign: 'center' }}>
          <Paragraph
            size="small"
            color="black"
            style={{ fontSize: '14px', marginLeft: '-24px' }}
          >
            STATUS
          </Paragraph>
        </div>
      ),
      width: '8%',
      renderRow: (pipeline: TPipeline) => <Status pipeline={pipeline} />,
    },
    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          VERSION
        </Paragraph>
      ),
      width: '8%',
      renderRow: (pipeline: TPipeline) => (
        <Paragraph size="small">{pipeline?.version}</Paragraph>
      ),
    },

    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          AUTHOR
        </Paragraph>
      ),
      width: '11%',
      renderRow: (pipeline: TPipeline) => {
        return (
          <FlexBox alignItems="center">
            <div
              data-tip
              data-for={
                pipeline?.user?.full_name
                  ? pipeline?.user?.full_name
                  : pipeline?.user?.name
              }
            >
              <FlexBox alignItems="center">
                <Paragraph size="small">
                  {pipeline?.user?.full_name
                    ? pipeline?.user?.full_name
                    : pipeline?.user?.name}
                </Paragraph>
              </FlexBox>
            </div>
            <ReactTooltip
              id={
                pipeline?.user?.full_name
                  ? pipeline?.user?.full_name
                  : pipeline?.user?.name
              }
              place="top"
              effect="solid"
            >
              <Paragraph color="white">
                {pipeline?.user?.full_name
                  ? pipeline?.user?.full_name
                  : pipeline?.user?.name}
                {/* {translate(`tooltips.${invoice.status}`)} */}
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
      width: '8%',
      renderRow: (pipeline: TPipeline) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={formatDateToDisplayOnTable(pipeline.created)}>
            <FlexBox alignItems="center">
              {/* <Box paddingRight="sm">
                <icons.calendar color={iconColors.grey} size={iconSizes.sm} />
              </Box> */}
              <Paragraph color="grey" size="tiny">
                {formatDateToDisplayOnTable(pipeline.created)}
              </Paragraph>
            </FlexBox>
          </div>
          <ReactTooltip
            id={formatDateToDisplayOnTable(pipeline.created)}
            place="top"
            effect="solid"
          >
            <Paragraph color="white">
              {formatDateToDisplayOnTable(pipeline.created)}
              {/* {translate(`tooltips.${invoice.status}`)} */}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
  ];
};
