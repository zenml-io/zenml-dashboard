/* eslint-disable */

import _ from 'lodash';
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  stackComponentsActions,
  stackPagesActions,
} from '../../../../../redux/actions';
import {
  workspaceSelectors,
  stackComponentSelectors,
  stackPagesSelectors,
  stackSelectors,
} from '../../../../../redux/selectors';
import { getFilteredDataForTable } from '../../../../../utils/tableFilters';
import { useLocationPath } from '../../../../hooks';
import { Sorting, SortingDirection } from './ForSorting/types';

interface ServiceInterface {
  openStackIds: TId[];
  setOpenStackIds: (ids: TId[]) => void;
  fetching: boolean;
  setFilteredStacks: (stacks: TStack[]) => void;
  filteredStacks: TStack[];
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
  ] = React.useState<SortingDirection | null>('ASC');
  const dispatch = useDispatch();
  const locationPath = useLocationPath();
  const [openStackIds, setOpenStackIds] = useState<TId[]>([]);
  const [filteredStacks, setFilteredStacks] = useState<TStack[]>([]);

  const fetching = useSelector(stackPagesSelectors.fetching);

  const stackComponents = useSelector(
    stackComponentSelectors.mystackComponents,
  );
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const stackComponentsPaginated = useSelector(
    stackComponentSelectors.mystackComponentsPaginated,
  );
  const isValidFilter = filter.map((f) => f.value).join('');
  useEffect(() => {
    setFilteredStacks(stackComponents as TStack[]);
  }, [stackComponents, filter]);

  useEffect(() => {
    if (!isValidFilter) {
      const intervalId = setInterval(() => {
        const applySorting =
          activeSortingDirection?.toLowerCase() + ':' + activeSorting;
        dispatch(
          stackComponentsActions.getMy({
            sort_by: applySorting ? applySorting : 'created',
            logical_operator: 'and',
            page: stackComponentsPaginated.page,
            size: stackComponentsPaginated.size,
            type: locationPath.split('/')[4],
            workspace: selectedWorkspace
              ? selectedWorkspace
              : locationPath.split('/')[2],
          }),
        );
      }, 5000);

      return () => clearInterval(intervalId);
    }
  });

  const setSelectedRunIds = (runIds: TId[]) => {
    dispatch(stackPagesActions.setSelectedRunIds({ runIds }));
  };

  return {
    filteredStacks,
    setFilteredStacks,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
    setSelectedRunIds,
    openStackIds,
    setOpenStackIds,
    fetching,
  };
};
