import React from 'react';
import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../../constants';
import { truncate, formatDateToDisplayOnTable } from '../../../../../utils';
import { FlexBox, icons, Paragraph, Tooltip } from '../../../../components';
import { HeaderCol } from '../../../common/Table';
import { SortingHeader } from './ForSorting/SortingHeader';
import { Sorting, SortingDirection } from './ForSorting/types';
import { Status } from './Status';
import { useService } from './ForSorting/useServiceForSorting';
import _ from 'lodash';
import { Pipeline } from '../../../../../api/types';

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
  expendedRow,
  openPipelineIds,
  setOpenPipelineIds,
  filteredPipelines,
  setFilteredPipelines,
  activeSorting,
  activeSortingDirection,
  setActiveSortingDirection,
  setActiveSorting,
}: {
  expendedRow?: any;
  openPipelineIds: TId[];
  setOpenPipelineIds: (ids: TId[]) => void;
  filteredPipelines: Pipeline[];
  setFilteredPipelines: (pipelines: Pipeline[]) => void;
  activeSorting: Sorting | null;
  activeSortingDirection: SortingDirection | null;
  setActiveSortingDirection: (direction: SortingDirection | null) => void;
  setActiveSorting: (sorting: Sorting | null) => void;
}): HeaderCol[] => {
  const { sortMethod } = useService({
    openPipelineIds,
    setOpenPipelineIds,
    setActiveSortingDirection,
    setActiveSorting,
    setFilteredPipelines,
    activeSorting,
    activeSortingDirection,
    filteredPipelines,
  });

  return [
    {
      render: () => (
        <SortingHeader
          data-testid="ID"
          onlyOneRow={
            filteredPipelines.length === 1 || expendedRow?.length === 1
          }
          sorting="id"
          sortMethod={sortMethod('id', {
            asc: (filteredPipelines: Pipeline[]) =>
              _.orderBy(filteredPipelines, ['id'], ['asc']),
            desc: (filteredPipelines: Pipeline[]) =>
              _.orderBy(filteredPipelines, ['id'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <HeaderText text="ID" margin="33px" />
        </SortingHeader>
      ),
      testId: 'Id',
      width: '20%',
      renderRow: (pipeline: Pipeline) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={pipeline.id}>
            <FlexBox.Row style={{ alignItems: 'center' }}>
              {expendedRow?.length === 1 ? (
                <icons.chevronDown
                  color={iconColors.grey}
                  size={iconSizes.xs}
                />
              ) : (
                <icons.rightArrow color={iconColors.grey} size={iconSizes.xs} />
              )}
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
        <SortingHeader
          onlyOneRow={
            filteredPipelines.length === 1 || expendedRow?.length === 1
          }
          sorting="name"
          sortMethod={sortMethod('name', {
            asc: (filteredPipelines: Pipeline[]) =>
              _.orderBy(filteredPipelines, ['name'], ['asc']),
            desc: (filteredPipelines: Pipeline[]) =>
              _.orderBy(filteredPipelines, ['name'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <HeaderText text="NAME" />
        </SortingHeader>
      ),
      testId: 'Name',
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
      testId: 'Status',
      width: '10%',
      renderRow: (pipeline: Pipeline) => <Status pipeline={pipeline} />,
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={
            filteredPipelines.length === 1 || expendedRow?.length === 1
          }
          sorting="version"
          sortMethod={sortMethod('version', {
            asc: (filteredPipelines: Pipeline[]) =>
              _.orderBy(filteredPipelines, ['version'], ['asc']),
            desc: (filteredPipelines: Pipeline[]) =>
              _.orderBy(filteredPipelines, ['version'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <HeaderText text="VERSION" />
        </SortingHeader>
      ),
      testId: 'Version',
      width: '10%',
      renderRow: (pipeline: Pipeline) => (
        <Paragraph size="small">{pipeline?.body?.version}</Paragraph>
      ),
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={
            filteredPipelines.length === 1 || expendedRow?.length === 1
          }
          sorting="user_id"
          sortMethod={sortMethod('user_id', {
            asc: (filteredPipelines: Pipeline[]) =>
              _.orderBy(filteredPipelines, ['user.name'], ['asc']),
            desc: (filteredPipelines: Pipeline[]) =>
              _.orderBy(filteredPipelines, ['user.name'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <HeaderText text="AUTHOR" />
        </SortingHeader>
      ),
      testId: 'Author',
      width: '10%',
      renderRow: (pipeline: Pipeline) => {
        return (
          <FlexBox alignItems="center">
            <div
              data-tip
              data-for={
                pipeline?.body?.user?.name
                // ? pipeline?.body?.user?.name
                // : pipeline?.body?.user?.name
              }
            >
              <FlexBox alignItems="center">
                <Paragraph size="small">
                  {
                    pipeline?.body?.user?.name
                    // ? pipeline?.body?.user?.name
                    // : pipeline?.body?.user?.name
                  }
                </Paragraph>
              </FlexBox>
            </div>
            <Tooltip
              id={
                pipeline?.body?.user?.name
                // ? pipeline?.body?.user?.name
                // : pipeline?.body?.user?.name
              }
              text={
                pipeline?.body?.user?.name
                // ? pipeline?.body?.user?.name
                // : pipeline?.body?.user?.name
              }
            />
          </FlexBox>
        );
      },
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={
            filteredPipelines.length === 1 || expendedRow?.length === 1
          }
          sorting="created"
          sortMethod={sortMethod('created', {
            asc: (filteredPipelines: Pipeline[]) =>
              _.orderBy(
                filteredPipelines,
                (pipeline: Pipeline) =>
                  new Date(pipeline.body?.created as string).getTime(),
                ['asc'],
              ),
            desc: (filteredPipelines: Pipeline[]) =>
              _.orderBy(
                filteredPipelines,
                (pipeline: Pipeline) =>
                  new Date(pipeline.body?.created as string).getTime(),
                ['desc'],
              ),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <HeaderText text="CREATED AT" />
        </SortingHeader>
      ),
      testId: 'created_at',
      width: '20%',
      renderRow: (pipeline: Pipeline) => (
        <FlexBox alignItems="center">
          <div
            data-tip
            data-for={formatDateToDisplayOnTable(pipeline.body?.created)}
          >
            <FlexBox alignItems="center">
              <Paragraph color="grey" size="tiny">
                {formatDateToDisplayOnTable(pipeline.body?.created)}
              </Paragraph>
            </FlexBox>
          </div>
          <Tooltip
            id={formatDateToDisplayOnTable(pipeline.body?.created)}
            text={formatDateToDisplayOnTable(pipeline.body?.created)}
          />
        </FlexBox>
      ),
    },
  ];
};
