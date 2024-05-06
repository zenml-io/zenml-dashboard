import { useDispatch, useSelector } from 'react-redux';
import { stackPagesActions } from '../../../../../../redux/actions';
import { stackPagesSelectors } from '../../../../../../redux/selectors';
import { Sorting, SortingDirection } from './types';
import { StackComponent } from '../../../../../../api/types';

export type SortMethod = (
  sorting: Sorting,
  {
    asc,
    desc,
  }: {
    asc: (stacks: StackComponent[]) => StackComponent[];
    desc: (stacks: StackComponent[]) => StackComponent[];
  },
) => void;

interface ServiceInterface {
  toggleSelectRun: (stack: StackComponent) => void;
  isRunSelected: (stack: StackComponent) => boolean;
  allRunsSelected: (stacks: StackComponent[]) => boolean;
  selectRuns: (stacks: StackComponent[]) => void;
  unselectRuns: (stacks: StackComponent[]) => void;
  sortMethod: SortMethod;
}

export const useService = ({
  activeSorting,
  activeSortingDirection,
  setActiveSortingDirection,
  setActiveSorting,
  setFilteredStacks,
  filteredStacks,
}: {
  activeSorting: Sorting | null;
  activeSortingDirection: SortingDirection | null;
  setActiveSortingDirection: (arg: SortingDirection | null) => void;
  setActiveSorting: (arg: Sorting | null) => void;
  setFilteredStacks: (stacks: StackComponent[]) => void;
  filteredStacks: StackComponent[];
}): ServiceInterface => {
  const dispatch = useDispatch();

  const setSelectedRunIds = (ids: TId[]) => {
    dispatch(stackPagesActions.setSelectedRunIds({ runIds: ids }));
  };

  const selectedRunIds = useSelector(stackPagesSelectors.selectedRunIds);

  const toggleSelectRun = (stack: StackComponent): void => {
    if (selectedRunIds.indexOf(stack.id) === -1) {
      setSelectedRunIds([...selectedRunIds, stack.id]);
    } else {
      setSelectedRunIds(selectedRunIds.filter((id: TId) => id !== stack.id));
    }
  };

  const isRunSelected = (stack: StackComponent): boolean => {
    return selectedRunIds.indexOf(stack.id) !== -1;
  };

  const selectRuns = (stacks: StackComponent[]): void => {
    setSelectedRunIds([
      ...selectedRunIds,
      ...stacks.map((stack: StackComponent) => stack.id),
    ]);
  };

  const unselectRuns = (stacks: StackComponent[]): void => {
    const runIdsToUnselect = stacks.map((stack: StackComponent) => stack.id);

    const newRunIds = selectedRunIds.filter(
      (id: TId) => !runIdsToUnselect.includes(id),
    );

    setSelectedRunIds(newRunIds);
  };

  const allRunsSelected = (stacks: StackComponent[]): boolean => {
    return stacks.every((stack: StackComponent) => isRunSelected(stack));
  };

  const sortMethod = (
    sorting: Sorting,
    sort?: {
      asc: (stacks: StackComponent[]) => StackComponent[];
      desc: (stacks: StackComponent[]) => StackComponent[];
    },
  ) => () => {
    if (sorting === activeSorting) {
      if (!!activeSortingDirection && activeSortingDirection === 'ASC') {
        setActiveSortingDirection('DESC');
      } else if (
        !!activeSortingDirection &&
        activeSortingDirection === 'DESC'
      ) {
        setActiveSortingDirection('ASC');
      }
    } else {
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
