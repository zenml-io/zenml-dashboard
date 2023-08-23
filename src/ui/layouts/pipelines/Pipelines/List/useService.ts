/* eslint-disable */

import _ from 'lodash';
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  pipelinePagesActions,
  pipelinesActions,
} from '../../../../../redux/actions';
import {
  pipelinePagesSelectors,
  pipelineSelectors,
  workspaceSelectors,
} from '../../../../../redux/selectors';
import { getFilteredDataForTable } from '../../../../../utils/tableFilters';
import { Sorting, SortingDirection } from './ForSorting/types';
import { callActionForPipelinesForPagination } from '../useService';
import { Pipeline } from '../../../../../api/types';
interface ServiceInterface {
  openPipelineIds: TId[];
  setOpenPipelineIds: (ids: TId[]) => void;
  fetching: boolean;
  filteredPipelines: Pipeline[];
  setFilteredPipelines: (pipelines: Pipeline[]) => void;
  setSelectedRunIds: (ids: TId[]) => void;
  activeSorting: Sorting | null;
  setActiveSorting: (arg: Sorting | null) => void;
  activeSortingDirection: SortingDirection | null;
  setActiveSortingDirection: (arg: SortingDirection | null) => void;
}

interface filterValue {
  label: string;
  type: string;
  value: string;
}
export const useService = ({
  filter,
  isExpended,
}: {
  isExpended?: any;
  filter: {
    column: filterValue;
    type: filterValue;
    value: string;
  }[];
}): ServiceInterface => {
  const [activeSorting, setActiveSorting] = React.useState<Sorting | null>(
    'created',
  );
  const [
    activeSortingDirection,
    setActiveSortingDirection,
  ] = React.useState<SortingDirection | null>('DESC');

  const dispatch = useDispatch();

  const [openPipelineIds, setOpenPipelineIds] = useState<TId[]>([]);
  const [filteredPipelines, setFilteredPipelines] = useState<Pipeline[]>([]);

  const fetching = useSelector(pipelinePagesSelectors.fetching);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const pipelines = useSelector(pipelineSelectors.myPipelines);
  const pipelinesPaginated = useSelector(
    pipelineSelectors.myPipelinesPaginated,
  );
  const isValidFilter = filter?.map((f) => f.value).join('');
  const { dispatchPipelineData } = callActionForPipelinesForPagination();
  useEffect(() => {
    setFilteredPipelines(pipelines as any[]);
  }, [filter, pipelines]);

  useEffect(() => {
    if (!isValidFilter && !isExpended) {
      const intervalId = setInterval(() => {
        const applySorting =
          activeSortingDirection?.toLowerCase() + ':' + activeSorting;
        dispatch(
          pipelinesActions.getMy({
            sort_by: applySorting !== 'created' ? applySorting : 'created',
            logical_operator: 'and',
            workspace: selectedWorkspace,
            page: pipelinesPaginated.page,
            size: pipelinesPaginated.size,
          }),
        );
      }, 5000);
      return () => clearInterval(intervalId);
    }
    // This is important
  });

  const setSelectedRunIds = (runIds: TId[]) => {
    dispatch(pipelinePagesActions.setSelectedRunIds({ runIds }));
  };

  return {
    openPipelineIds,
    setOpenPipelineIds,
    fetching,
    filteredPipelines,
    setSelectedRunIds,
    setFilteredPipelines,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
  };
};
