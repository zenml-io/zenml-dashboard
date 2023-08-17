/* eslint-disable */

import _ from 'lodash';
import React from 'react';
import { useEffect } from 'react';
import { Sorting, SortingDirection } from './types';
import { stackPagesActions } from '../../../../redux/actions';
import { useDispatch, useSelector } from '../../../hooks';
import { runSelectors } from '../../../../redux/selectors';
import { source } from '../../../../api/fetchApi';

interface ServiceInterface {
  sortedRuns: TRun[];
  setSortedRuns: (runs: TRun[]) => void;
  activeSorting: Sorting | null;
  setActiveSorting: (arg: Sorting | null) => void;
  activeSortingDirection: SortingDirection | null;
  setActiveSortingDirection: (arg: SortingDirection | null) => void;
  setSelectedRunIds: (ids: TId[]) => void;
}

export const useService = ({ runIds }: { runIds: TId[] }): ServiceInterface => {
  const dispatch = useDispatch();
  const [activeSorting, setActiveSorting] = React.useState<Sorting | null>(
    'created',
  );
  const [
    activeSortingDirection,
    setActiveSortingDirection,
  ] = React.useState<SortingDirection | null>('DESC');
  const [sortedRuns, setSortedRuns] = React.useState<TRun[]>([]);

  const runs = useSelector(runSelectors.forRunIds(runIds));

  useEffect(() => {
    setSortedRuns(runs as TRun[]);
  }, []);
  useEffect(() => {
    return () => {
      source.cancel.forEach((element: any) => {
        element();
      });
    };
  }, []);

  const setSelectedRunIds = (runIds: TId[]) => {
    dispatch(stackPagesActions.setSelectedRunIds({ runIds }));
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
