import React from 'react';
import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../constants';
import { truncate, formatDateToDisplayOnTable } from '../../../../utils';
import { FlexBox, icons, Paragraph, Tooltip } from '../../../components';
import { HeaderCol } from '../../common/Table';
import { Status } from '../Pipelines/List/Status';
import { Pipeline } from '../../../../api/types';

const HeaderText = ({ text, margin }: { text: string; margin?: string }) => (
  <Paragraph
    size="small"
    color="black"
    style={{ fontSize: '14px', marginLeft: margin }}
  >
    {text}
  </Paragraph>
);

export const GetHeaderCols = ({
  filteredPipelines,
}: {
  filteredPipelines: Pipeline[];
}): HeaderCol[] => {
  return [
    {
      render: () => <HeaderText text="ID" margin="33px" />,
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
      render: () => <HeaderText text="NAME" />,
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
          <HeaderText text="STATUS" margin="-24px" />
        </div>
      ),
      width: '10%',
      renderRow: (pipeline: Pipeline) => <Status pipeline={pipeline} />,
    },
    {
      render: () => <HeaderText text="VERSION" />,
      width: '10%',
      renderRow: (pipeline: Pipeline) => (
        <Paragraph size="small">{/* {pipeline?.version} */}</Paragraph>
      ),
    },
    {
      render: () => <HeaderText text="AUTHOR" />,
      width: '10%',
      renderRow: (pipeline: Pipeline) => {
        return (
          <FlexBox alignItems="center">
            <div data-tip data-for={pipeline?.body?.user?.name}>
              <FlexBox alignItems="center">
                <Paragraph size="small">{pipeline?.body?.user?.name}</Paragraph>
              </FlexBox>
            </div>
            <Tooltip
              id={pipeline?.body?.user?.name}
              text={pipeline?.body?.user?.name}
            />
          </FlexBox>
        );
      },
    },
    {
      render: () => <HeaderText text="CREATED AT" />,
      width: '20%',
      renderRow: (pipeline: Pipeline) => (
        <FlexBox alignItems="center">
          <div
            data-tip
            data-for={formatDateToDisplayOnTable(pipeline?.body?.created)}
          >
            <FlexBox alignItems="center">
              <Paragraph color="grey" size="tiny">
                {formatDateToDisplayOnTable(pipeline?.body?.created)}
              </Paragraph>
            </FlexBox>
          </div>
          <Tooltip
            id={formatDateToDisplayOnTable(pipeline?.body?.created)}
            text={formatDateToDisplayOnTable(pipeline?.body?.created)}
          />
        </FlexBox>
      ),
    },
  ];
};
