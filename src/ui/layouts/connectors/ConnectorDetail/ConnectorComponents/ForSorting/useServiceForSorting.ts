import { useDispatch, useSelector } from 'react-redux';
import { stackPagesActions } from '../../../../../../redux/actions';
import { stackPagesSelectors } from '../../../../../../redux/selectors';
import { Sorting, SortingDirection } from './types';

export type SortMethod = (
  sorting: Sorting,
  {
    asc,
    desc,
  }: {
    asc: (stacks: TStack[]) => TStack[];
    desc: (stacks: TStack[]) => TStack[];
  },
) => void;

interface ServiceInterface {
  toggleSelectRun: (stack: TStack) => void;
  isRunSelected: (stack: TStack) => boolean;
  allRunsSelected: (stacks: TStack[]) => boolean;
  selectRuns: (stacks: TStack[]) => void;
  unselectRuns: (stacks: TStack[]) => void;
  sortMethod: SortMethod;
}

export const useService = ({
  activeSorting,
  activeSortingDirection,
  setActiveSortingDirection,
  setActiveSorting,
  setFilteredConnectors,
  filteredConnectors,
}: {
  activeSorting: Sorting | null;
  activeSortingDirection: SortingDirection | null;
  setActiveSortingDirection: (arg: SortingDirection | null) => void;
  setActiveSorting: (arg: Sorting | null) => void;
  setFilteredConnectors: (stacks: TStack[]) => void;
  filteredConnectors: TStack[];
}): ServiceInterface => {
  const dispatch = useDispatch();

  const setSelectedRunIds = (ids: TId[]) => {
    dispatch(stackPagesActions.setSelectedRunIds({ runIds: ids }));
  };

  const selectedRunIds = useSelector(stackPagesSelectors.selectedRunIds);

  const toggleSelectRun = (stack: TStack): void => {
    if (selectedRunIds.indexOf(stack.id) === -1) {
      setSelectedRunIds([...selectedRunIds, stack.id]);
    } else {
      setSelectedRunIds(selectedRunIds.filter((id: TId) => id !== stack.id));
    }
  };

  const isRunSelected = (stack: TStack): boolean => {
    return selectedRunIds.indexOf(stack.id) !== -1;
  };

  const selectRuns = (stacks: TStack[]): void => {
    setSelectedRunIds([
      ...selectedRunIds,
      ...stacks.map((stack: TStack) => stack.id),
    ]);
  };

  const unselectRuns = (stacks: TStack[]): void => {
    const runIdsToUnselect = stacks.map((stack: TStack) => stack.id);

    const newRunIds = selectedRunIds.filter(
      (id: TId) => !runIdsToUnselect.includes(id),
    );

    setSelectedRunIds(newRunIds);
  };

  const allRunsSelected = (stacks: TStack[]): boolean => {
    return stacks.every((stack: TStack) => isRunSelected(stack));
  };

  const sortMethod = (
    sorting: Sorting,
    sort?: {
      asc: (stacks: TStack[]) => TStack[];
      desc: (stacks: TStack[]) => TStack[];
    },
  ) => () => {
    if (sorting === activeSorting) {
      if (!!activeSortingDirection && activeSortingDirection === 'ASC') {
        // sort && setFilteredStacks(sort.desc(filteredStacks));
        setActiveSortingDirection('DESC');
      } else if (
        !!activeSortingDirection &&
        activeSortingDirection === 'DESC'
      ) {
        // sort && setFilteredStacks(sort.asc(filteredStacks));
        setActiveSortingDirection('ASC');
      }
    } else {
      // sort && setFilteredStacks(sort.desc(filteredStacks));
      setActiveSortingDirection('DESC');
    }
    setActiveSorting(sorting);
  };

  return {
    toggleSelectRun,
    isRunSelected,
    unselectRuns,
    selectRuns,
    allRunsSelected,
    sortMethod,
  };
};
