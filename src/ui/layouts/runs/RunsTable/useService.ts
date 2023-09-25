/* eslint-disable */

import _ from 'lodash';
import React from 'react';
import { useEffect } from 'react';
import { Sorting, SortingDirection } from './types';
import { pipelinePagesActions } from '../../../../redux/actions';
import { useDispatch, useSelector } from '../../../hooks';
import { runSelectors } from '../../../../redux/selectors';
import { getFilteredDataForTable } from '../../../../utils/tableFilters';
import { source } from '../../../../api/fetchApi';
import { Run } from '../../../../api/types';

interface ServiceInterface {
  sortedRuns: Run[];
  setSortedRuns: (runs: Run[]) => void;
  activeSorting: Sorting | null;
  setActiveSorting: (arg: Sorting | null) => void;
  activeSortingDirection: SortingDirection | null;
  setActiveSortingDirection: (arg: SortingDirection | null) => void;
  setSelectedRunIds: (ids: TId[]) => void;
}
interface filterValue {
  label: string;
  type: string;
  value: string;
}

export const useService = ({
  // pipelineRuns,
  runIds,
  filter,
}: {
  // pipelineRuns: any;
  runIds: TId[];
  filter: {
    column: filterValue;
    type: filterValue;
    value: string;
  }[];
}): ServiceInterface => {
  const dispatch = useDispatch();
  const [activeSorting, setActiveSorting] = React.useState<Sorting | null>(
    'created',
  );

  const [
    activeSortingDirection,
    setActiveSortingDirection,
  ] = React.useState<SortingDirection | null>('DESC');
  const [sortedRuns, setSortedRuns] = React.useState<Run[]>([]);

  const runs = useSelector(runSelectors.forRunIds(runIds));
  const isValidFilter = filter?.map((f) => f.value).join('');
  useEffect(() => {
    setSortedRuns(runs);
  }, [filter, runIds]);

  useEffect(() => {
    return () => {
      source.cancel.forEach((element: any) => {
        element();
      });
    };
  }, []);

  const setSelectedRunIds = (runIds: TId[]) => {
    dispatch(pipelinePagesActions.setSelectedRunIds({ runIds }));
  };

  return {
    sortedRuns,
    setSortedRuns,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
    setSelectedRunIds,
  };
};
