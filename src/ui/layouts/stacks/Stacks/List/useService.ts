/* eslint-disable */

import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stackPagesActions } from '../../../../../redux/actions';
import {
  stackPagesSelectors,
  stackSelectors,
} from '../../../../../redux/selectors';
import { getFilteredDataForTable } from '../../../../../utils/tableFilters';

interface ServiceInterface {
  openStackIds: TId[];
  setOpenStackIds: (ids: TId[]) => void;
  fetching: boolean;
  filteredStacks: TStack[];
  setSelectedRunIds: (ids: TId[]) => void;
}

// export const useService = (): ServiceInterface => {
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
  const dispatch = useDispatch();

  const [openStackIds, setOpenStackIds] = useState<TId[]>([]);
  const [filteredStacks, setFilteredStacks] = useState<TStack[]>([]);

  const fetching = useSelector(stackPagesSelectors.fetching);

  const currentWorkspace = useSelector(stackPagesSelectors.currentWorkspace);

  const Stacks = useSelector(stackSelectors.mystacks);

  useEffect(() => {
    let orderedStacks = _.sortBy(Stacks, (stack: TStack) =>
      new Date(stack.created).getTime(),
    ).reverse();

    const isValidFilter = filter.map((f) => f.value).join('');
    if (isValidFilter) {
      orderedStacks = getFilteredDataForTable(orderedStacks, filter);
    }

    setFilteredStacks(orderedStacks);
  }, [Stacks, filter]);

  const setSelectedRunIds = (runIds: TId[]) => {
    dispatch(stackPagesActions.setSelectedRunIds({ runIds }));
  };

  return {
    openStackIds,
    setOpenStackIds,
    fetching,
    filteredStacks,
    setSelectedRunIds,
  };
};
