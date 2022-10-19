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
    null,
  );
  const [
    activeSortingDirection,
    setActiveSortingDirection,
  ] = React.useState<SortingDirection | null>('DESC');
  const dispatch = useDispatch();
  const locationPath = useLocationPath();
  const [openStackIds, setOpenStackIds] = useState<TId[]>([]);
  const [filteredStacks, setFilteredStacks] = useState<TStack[]>([]);

  const fetching = useSelector(stackPagesSelectors.fetching);

  // const currentWorkspace = useSelector(stackPagesSelectors.currentWorkspace);

  const stackComponents = useSelector(
    stackComponentSelectors.mystackComponents,
  );

  useEffect(() => {
    let orderedStacks =
      activeSorting === null
        ? _.sortBy(stackComponents, (stack: TStack) =>
            new Date(stack.created).getTime(),
          ).reverse()
        : _.orderBy(
            stackComponents,
            [activeSorting],
            [activeSortingDirection === 'DESC' ? 'desc' : 'asc'],
          );

    const isValidFilter = filter.map((f) => f.value).join('');
    if (isValidFilter) {
      orderedStacks = getFilteredDataForTable(orderedStacks, filter);
    }

    setFilteredStacks(orderedStacks);
  }, [stackComponents, filter]);

  useEffect(() => {
    // if (activeSorting === null) {
    // debugger;
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.
      dispatch(
        stackComponentsActions.getMy({
          // id: currentWorkspace.id,
          type: locationPath.split('/')[2],
        }),
      );
    }, 5000);

    return () => clearInterval(intervalId);
    // }
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
