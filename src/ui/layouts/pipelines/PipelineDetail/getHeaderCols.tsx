import React from 'react';
import ReactTooltip from 'react-tooltip';
import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../constants';
import { truncate, formatDateToDisplayOnTable } from '../../../../utils';
import { FlexBox, icons, Paragraph } from '../../../components';
import { HeaderCol } from '../../common/Table';

import { Status } from '../Pipelines/List/Status';

export const GetHeaderCols = ({
  filteredPipelines,
}: {
  filteredPipelines: TPipeline[];
}): HeaderCol[] => {
  return [
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
      width: '30%',
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
      width: '10%',
      renderRow: (pipeline: TPipeline) => <Status pipeline={pipeline} />,
    },
    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          VERSION
        </Paragraph>
      ),
      width: '10%',
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
      width: '10%',
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
      width: '20%',
      renderRow: (pipeline: TPipeline) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={formatDateToDisplayOnTable(pipeline.created)}>
            <FlexBox alignItems="center">
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
