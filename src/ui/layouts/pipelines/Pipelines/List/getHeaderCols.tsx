import React from 'react';
import ReactTooltip from 'react-tooltip';
import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../../constants';
import { truncate, formatDateToDisplayOnTable } from '../../../../../utils';
import { FlexBox, icons, Paragraph } from '../../../../components';
import { HeaderCol } from '../../../common/Table';
import { SortingHeader } from './ForSorting/SortingHeader';
import { Sorting, SortingDirection } from './ForSorting/types';
import { Status } from './Status';
import { useService } from './ForSorting/useServiceForSorting';
import _ from 'lodash';

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
  filteredPipelines: TPipeline[];
  setFilteredPipelines: (pipelines: TPipeline[]) => void;
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
          onlyOneRow={
            filteredPipelines.length === 1 || expendedRow?.length === 1
          }
          sorting="id"
          sortMethod={sortMethod('id', {
            asc: (filteredPipelines: TPipeline[]) =>
              _.orderBy(filteredPipelines, ['id'], ['asc']),
            desc: (filteredPipelines: TPipeline[]) =>
              _.orderBy(filteredPipelines, ['id'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph
            size="small"
            color="black"
            style={{ fontSize: '14px', marginLeft: '33px' }}
          >
            ID
          </Paragraph>
        </SortingHeader>
      ),
      width: '20%',
      renderRow: (pipeline: TPipeline) => (
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
        <SortingHeader
          onlyOneRow={
            filteredPipelines.length === 1 || expendedRow?.length === 1
          }
          sorting="name"
          sortMethod={sortMethod('name', {
            asc: (filteredPipelines: TPipeline[]) =>
              _.orderBy(filteredPipelines, ['name'], ['asc']),
            desc: (filteredPipelines: TPipeline[]) =>
              _.orderBy(filteredPipelines, ['name'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
            NAME
          </Paragraph>
        </SortingHeader>
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
        <SortingHeader
          onlyOneRow={
            filteredPipelines.length === 1 || expendedRow?.length === 1
          }
          sorting="version"
          sortMethod={sortMethod('version', {
            asc: (filteredPipelines: TPipeline[]) =>
              _.orderBy(filteredPipelines, ['version'], ['asc']),
            desc: (filteredPipelines: TPipeline[]) =>
              _.orderBy(filteredPipelines, ['version'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
            VERSION
          </Paragraph>
        </SortingHeader>
      ),
      width: '10%',
      renderRow: (pipeline: TPipeline) => (
        <Paragraph size="small">{pipeline?.version}</Paragraph>
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
            asc: (filteredPipelines: TPipeline[]) =>
              _.orderBy(filteredPipelines, ['user.name'], ['asc']),
            desc: (filteredPipelines: TPipeline[]) =>
              _.orderBy(filteredPipelines, ['user.name'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
            AUTHOR
          </Paragraph>
        </SortingHeader>
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
        <SortingHeader
          onlyOneRow={
            filteredPipelines.length === 1 || expendedRow?.length === 1
          }
          sorting="created"
          sortMethod={sortMethod('created', {
            asc: (filteredPipelines: TPipeline[]) =>
              _.orderBy(
                filteredPipelines,
                (pipeline: TPipeline) => new Date(pipeline.created).getTime(),
                ['asc'],
              ),
            desc: (filteredPipelines: TPipeline[]) =>
              _.orderBy(
                filteredPipelines,
                (pipeline: TPipeline) => new Date(pipeline.created).getTime(),
                ['desc'],
              ),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
            CREATED AT
          </Paragraph>
        </SortingHeader>
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
