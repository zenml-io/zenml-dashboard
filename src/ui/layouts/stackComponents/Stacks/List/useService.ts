/* eslint-disable */

import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stackPagesActions } from '../../../../../redux/actions';
import {
  stackComponentSelectors,
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

  // const currentWorkspace = useSelector(stackPagesSelectors.currentWorkspace);

  const stackComponents = useSelector(
    stackComponentSelectors.mystackComponents,
  );

  useEffect(() => {
    let orderedStacks = _.sortBy(stackComponents, (stack: TStack) =>
      new Date(stack.creationDate).getTime(),
    ).reverse();

    const isValidFilter = filter.map((f) => f.value).join('');
    if (isValidFilter) {
      orderedStacks = getFilteredDataForTable(orderedStacks, filter);
    }
    // const filteredPipelines = orderedPipelines.filter(
    //   (pipeline: TPipeline) =>
    //     currentWorkspace && pipeline.projectName === currentWorkspace.id,
    // );
    // debugger;
    setFilteredStacks(orderedStacks);
  }, [stackComponents, filter]);

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
