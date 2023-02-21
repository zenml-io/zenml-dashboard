/* eslint-disable */

import _ from 'lodash';
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stackPagesActions, stacksActions } from '../../../../../redux/actions';
import {
  workspaceSelectors,
  stackPagesSelectors,
  stackSelectors,
} from '../../../../../redux/selectors';
import { getFilteredDataForTable } from '../../../../../utils/tableFilters';
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
export const useService = ({
  stackComponentId,
  filter,
  isExpended,
}: {
  stackComponentId?: any;
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

  const [openStackIds, setOpenStackIds] = useState<TId[]>([]);
  const [filteredStacks, setFilteredStacks] = useState<TStack[]>([]);

  const fetching = useSelector(stackPagesSelectors.fetching);

  const Stacks = useSelector(stackSelectors.mystacks);
  const stacksPaginated = useSelector(stackSelectors.mystacksPaginated);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const isValidFilter = filter.map((f) => f.value).join('');

  useEffect(() => {
    setFilteredStacks(Stacks as TStack[]);
  }, [Stacks, filter]);

  useEffect(() => {
    if (!isValidFilter && !isExpended) {
      const applySorting =
        activeSortingDirection?.toLowerCase() + ':' + activeSorting;
      const intervalId = setInterval(() => {
        dispatch(
          stacksActions.getMy({
            component_id: stackComponentId,
            sort_by: applySorting ? applySorting : 'created',
            logical_operator: 'and',
            workspace: selectedWorkspace,
            index: stacksPaginated.page,
            max_size: stacksPaginated.size,
          }),
        );
      }, 5000);

      return () => clearInterval(intervalId); //This is important
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
