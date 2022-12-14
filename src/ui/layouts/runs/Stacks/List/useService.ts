/* eslint-disable */

import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stackPagesActions } from '../../../../../redux/actions';
import {
  stackPagesSelectors,
  stackSelectors,
} from '../../../../../redux/selectors';

interface ServiceInterface {
  openStackIds: TId[];
  setOpenStackIds: (ids: TId[]) => void;
  fetching: boolean;
  filteredStacks: TStack[];
  setSelectedRunIds: (ids: TId[]) => void;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();

  const [openStackIds, setOpenStackIds] = useState<TId[]>([]);
  const [filteredStacks, setFilteredStacks] = useState<TStack[]>([]);

  const fetching = useSelector(stackPagesSelectors.fetching);

  const Stacks = useSelector(stackSelectors.mystacks);

  useEffect(() => {
    const orderedStacks = _.sortBy(Stacks, (stack: TStack) =>
      new Date(stack.created).getTime(),
    ).reverse();

    setFilteredStacks(orderedStacks);
  }, [Stacks]);

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
