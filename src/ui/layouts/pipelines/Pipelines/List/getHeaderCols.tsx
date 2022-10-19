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
  LinkBox,
  ColoredCircle,
  Paragraph,
} from '../../../../components';
import { HeaderCol } from '../../../common/Table';
import { SortingHeader } from './ForSorting/SortingHeader';
import { Sorting, SortingDirection } from './ForSorting/types';
import { Status } from './Status';
import { useService } from './ForSorting/useServiceForSorting';
import _ from 'lodash';
// import { WorkspaceName } from './WorkspaceName';
// import { UserName } from './UserName';

export const GetHeaderCols = ({
  openPipelineIds,
  setOpenPipelineIds,
  filteredPipelines,
  setFilteredPipelines,
  activeSorting,
  activeSortingDirection,
  setActiveSortingDirection,
  setActiveSorting,
}: {
  openPipelineIds: TId[];
  setOpenPipelineIds: (ids: TId[]) => void;
  filteredPipelines: TPipeline[];
  setFilteredPipelines: (pipelines: TPipeline[]) => void;
  activeSorting: Sorting | null;
  activeSortingDirection: SortingDirection | null;
  setActiveSortingDirection: (direction: SortingDirection | null) => void;
  setActiveSorting: (sorting: Sorting | null) => void;
}): HeaderCol[] => {
  const {
    // toggleSelectRun,
    // isRunSelected,
    // selectRuns,
    // unselectRuns,
    // allRunsSelected,
    sortMethod,
  } = useService({
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
        <SortingHeader
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
          <Paragraph size="small" color="black" style={{ fontSize: '12px' }}>
            ID
          </Paragraph>
        </SortingHeader>
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
        <SortingHeader
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
          <Paragraph size="small" color="black" style={{ fontSize: '12px' }}>
            NAME
          </Paragraph>
        </SortingHeader>
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
        <Paragraph size="small" color="black" style={{ fontSize: '12px' }}>
          STATUS
        </Paragraph>
      ),
      width: '8%',
      renderRow: (pipeline: TPipeline) => <Status pipeline={pipeline} />,
    },

    {
      render: () => (
        <SortingHeader
          sorting="author"
          sortMethod={sortMethod('author', {
            asc: (filteredPipelines: TPipeline[]) =>
              _.orderBy(filteredPipelines, ['user.name'], ['asc']),
            desc: (filteredPipelines: TPipeline[]) =>
              _.orderBy(filteredPipelines, ['user.name'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '12px' }}>
            AUTHOR {console.log('filteredPipelines', filteredPipelines)}
          </Paragraph>
        </SortingHeader>
        // <Paragraph size="small" color="black" style={{ fontSize: '12px' }}>
        //   AUTHOR
        // </Paragraph>
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
        <SortingHeader
          sorting="createdAt"
          sortMethod={sortMethod('createdAt', {
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
          <Paragraph size="small" color="black" style={{ fontSize: '12px' }}>
            CREATED
          </Paragraph>
        </SortingHeader>
      ),
      width: '8%',
      renderRow: (pipeline: TPipeline) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={formatDateToSort(pipeline.created)}>
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
            id={formatDateToSort(pipeline.created)}
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
