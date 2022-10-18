/* eslint-disable */

import _ from 'lodash';
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stackPagesActions, stacksActions } from '../../../../../redux/actions';
import {
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
export const useService = (
  filter: {
    column: filterValue;
    type: filterValue;
    value: string;
  }[],
): ServiceInterface => {
  const [activeSorting, setActiveSorting] = React.useState<Sorting | null>(
    null,
  );
  const [
    activeSortingDirection,
    setActiveSortingDirection,
  ] = React.useState<SortingDirection | null>('DESC');
  const dispatch = useDispatch();

  const [openStackIds, setOpenStackIds] = useState<TId[]>([]);
  const [filteredStacks, setFilteredStacks] = useState<TStack[]>([]);

  const fetching = useSelector(stackPagesSelectors.fetching);

  const currentWorkspace = useSelector(stackPagesSelectors.currentWorkspace);

  const Stacks = useSelector(stackSelectors.mystacks);

  useEffect(() => {
    // let orderedStacks = _.sortBy(Stacks, (stack: TStack) =>
    //   new Date(stack.created).getTime(),
    // ).reverse();

    let orderedStacks =
      activeSorting === null
        ? _.sortBy(Stacks, (stack: TStack) =>
            new Date(stack.created).getTime(),
          ).reverse()
        : _.orderBy(
            Stacks,
            [activeSorting],
            [activeSortingDirection === 'DESC' ? 'desc' : 'asc'],
          );

    const isValidFilter = filter.map((f) => f.value).join('');
    if (isValidFilter) {
      orderedStacks = getFilteredDataForTable(orderedStacks, filter);
    }

    setFilteredStacks(orderedStacks);
  }, [Stacks, filter]);

  useEffect(() => {
    // if (activeSorting === null) {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.
      dispatch(stacksActions.getMy({}));
    }, 5000);

    return () => clearInterval(intervalId);
    // }
    //This is important
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
