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
  projectSelectors,
} from '../../../../../redux/selectors';
import { getFilteredDataForTable } from '../../../../../utils/tableFilters';
import { Sorting, SortingDirection } from './ForSorting/types';

interface ServiceInterface {
  openPipelineIds: TId[];
  setOpenPipelineIds: (ids: TId[]) => void;
  fetching: boolean;
  filteredPipelines: TPipeline[];
  setFilteredPipelines: (pipelines: TPipeline[]) => void;
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
export const useService = (
  filter: {
    column: filterValue;
    type: filterValue;
    value: string;
  }[],
): ServiceInterface => {
  const [activeSorting, setActiveSorting] = React.useState<Sorting | null>(
    'created',
  );
  const [
    activeSortingDirection,
    setActiveSortingDirection,
  ] = React.useState<SortingDirection | null>('DESC');

  const dispatch = useDispatch();

  const [openPipelineIds, setOpenPipelineIds] = useState<TId[]>([]);
  const [filteredPipelines, setFilteredPipelines] = useState<TPipeline[]>([]);

  const fetching = useSelector(pipelinePagesSelectors.fetching);
  const selectedProject = useSelector(projectSelectors.selectedProject);
  const pipelines = useSelector(pipelineSelectors.myPipelines);
  const pipelinesPaginated = useSelector(
    pipelineSelectors.myPipelinesPaginated,
  );
  const isValidFilter = filter.map((f) => f.value).join('');
  useEffect(() => {
    let orderedPipelines = _.orderBy(
      pipelines,
      [activeSorting],
      [activeSortingDirection === 'DESC' ? 'desc' : 'asc'],
    );

    // const isValidFilter = filter.map((f) => f.value).join('');
    // if (isValidFilter) {
    //  orderedPipelines = getFilteredDataForTable(orderedPipelines, filter);
    // }

    setFilteredPipelines(orderedPipelines as any[]);
  }, [filter, pipelines]);

  useEffect(() => {
    if (!isValidFilter) {
      const intervalId = setInterval(() => {
        //assign interval to a variable to clear it.

        dispatch(
          pipelinesActions.getMy({
            sort_by: 'created',
            logical_operator: 'and',
            // name: '',
            project: selectedProject,
            page: pipelinesPaginated.page,
            size: pipelinesPaginated.size,
          }),
        );
      }, 5000);

      return () => clearInterval(intervalId);
    }
    //This is important
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
