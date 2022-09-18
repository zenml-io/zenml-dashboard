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

// export const useService = (): ServiceInterface => {
export const useService = (
  filter: {
    column: string;
    type: string;
    value: string;
  } = {
    column: '',
    type: '',
    value: '',
  },
): ServiceInterface => {
  const dispatch = useDispatch();

  const [openStackIds, setOpenStackIds] = useState<TId[]>([]);
  const [filteredStacks, setFilteredStacks] = useState<TStack[]>([]);

  const fetching = useSelector(stackPagesSelectors.fetching);

  const currentWorkspace = useSelector(stackPagesSelectors.currentWorkspace);

  const Stacks = useSelector(stackSelectors.mystacks);

  useEffect(() => {
    let orderedStacks = _.sortBy(Stacks, (stack: TStack) =>
      new Date(stack.creationDate).getTime(),
    ).reverse();

    if (filter.value) {
      orderedStacks = orderedStacks.filter((os: any) => {
        return os[filter.column]
          .toLowerCase()
          .includes(filter.value.toLowerCase());
      });
    }

    setFilteredStacks(orderedStacks);
  }, [filter]);

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
