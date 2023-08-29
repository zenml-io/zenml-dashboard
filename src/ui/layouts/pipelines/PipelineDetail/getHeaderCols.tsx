import React from 'react';
import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../constants';
import { truncate, formatDateToDisplayOnTable } from '../../../../utils';
import {
  // Box,
  FlexBox,
  icons,
  // LinkBox,
  Paragraph,
  Tooltip,
} from '../../../components';
import { HeaderCol } from '../../common/Table';

import { Status } from '../Pipelines/List/Status';
import { Pipeline } from '../../../../api/types';

export const GetHeaderCols = ({
  filteredPipelines,
}: {
  filteredPipelines: Pipeline[];
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
      renderRow: (pipeline: Pipeline) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={pipeline.id}>
            <FlexBox.Row style={{ alignItems: 'center' }}>
              <icons.chevronDown color={iconColors.grey} size={iconSizes.xs} />
              <Paragraph size="small" style={{ marginLeft: '20px' }}>
                {truncate(pipeline.id, ID_MAX_LENGTH)}
              </Paragraph>
            </FlexBox.Row>
          </div>
          <Tooltip id={pipeline.id} text={pipeline.id} />
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
      renderRow: (pipeline: Pipeline) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={pipeline.name}>
            <Paragraph size="small">{pipeline.name}</Paragraph>
          </div>
          <Tooltip id={pipeline.name} text={pipeline.name} />
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
      renderRow: (pipeline: Pipeline) => <Status pipeline={pipeline} />,
    },
    {
      render: () => (
        <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
          VERSION
        </Paragraph>
      ),
      width: '10%',
      renderRow: (pipeline: Pipeline) => (
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
      renderRow: (pipeline: Pipeline) => {
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
            <Tooltip
              id={
                pipeline?.user?.full_name
                  ? pipeline?.user?.full_name
                  : pipeline?.user?.name
              }
              text={
                pipeline?.user?.full_name
                  ? pipeline?.user?.full_name
                  : pipeline?.user?.name
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
      renderRow: (pipeline: Pipeline) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={formatDateToDisplayOnTable(pipeline.created)}>
            <FlexBox alignItems="center">
              <Paragraph color="grey" size="tiny">
                {formatDateToDisplayOnTable(pipeline.created)}
              </Paragraph>
            </FlexBox>
          </div>
          <Tooltip
            id={formatDateToDisplayOnTable(pipeline.created)}
            text={formatDateToDisplayOnTable(pipeline.created)}
          />
        </FlexBox>
      ),
    },
  ];
};
