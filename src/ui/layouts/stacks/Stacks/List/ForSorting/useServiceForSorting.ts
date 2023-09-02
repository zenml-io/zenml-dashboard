import { useDispatch, useSelector } from 'react-redux';
import { stackPagesActions } from '../../../../../../redux/actions';
import { stackPagesSelectors } from '../../../../../../redux/selectors';
import { Sorting, SortingDirection } from './types';
import { Stack } from '../../../../../../api/types';

export type SortMethod = (
  sorting: Sorting,
  {
    asc,
    desc,
  }: {
    asc: (stacks: Stack[]) => Stack[];
    desc: (stacks: Stack[]) => Stack[];
  },
) => void;

interface ServiceInterface {
  toggleSelectRun: (stack: Stack) => void;
  isRunSelected: (stack: Stack) => boolean;
  allRunsSelected: (stacks: Stack[]) => boolean;
  selectRuns: (stacks: Stack[]) => void;
  unselectRuns: (stacks: Stack[]) => void;
  sortMethod: SortMethod;
}

export const useService = ({
  activeSorting,
  activeSortingDirection,
  setActiveSortingDirection,
  setActiveSorting,
}: {
  activeSorting: Sorting | null;
  activeSortingDirection: SortingDirection | null;
  setActiveSortingDirection: (arg: SortingDirection | null) => void;
  setActiveSorting: (arg: Sorting | null) => void;
}): ServiceInterface => {
  const dispatch = useDispatch();

  const setSelectedRunIds = (ids: TId[]) => {
    dispatch(stackPagesActions.setSelectedRunIds({ runIds: ids }));
  };

  const selectedRunIds = useSelector(stackPagesSelectors.selectedRunIds);

  const toggleSelectRun = (stack: Stack): void => {
    if (selectedRunIds.indexOf(stack.id) === -1) {
      setSelectedRunIds([...selectedRunIds, stack.id]);
    } else {
      setSelectedRunIds(selectedRunIds.filter((id: TId) => id !== stack.id));
    }
  };

  const isRunSelected = (stack: Stack): boolean => {
    return selectedRunIds.indexOf(stack.id) !== -1;
  };

  const selectRuns = (stacks: Stack[]): void => {
    setSelectedRunIds([
      ...selectedRunIds,
      ...stacks.map((stack: Stack) => stack.id),
    ]);
  };

  const unselectRuns = (stacks: Stack[]): void => {
    const runIdsToUnselect = stacks.map((stack: Stack) => stack.id);

    const newRunIds = selectedRunIds.filter(
      (id: TId) => !runIdsToUnselect.includes(id),
    );

    setSelectedRunIds(newRunIds);
  };

  const allRunsSelected = (stacks: Stack[]): boolean => {
    return stacks.every((stack: Stack) => isRunSelected(stack));
  };

  const sortMethod = (
    sorting: Sorting,
    sort?: {
      asc: (stacks: Stack[]) => Stack[];
      desc: (stacks: Stack[]) => Stack[];
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
