import { useDispatch, useSelector } from 'react-redux';
import { stackPagesActions } from '../../../../../redux/actions';
import { stackPagesSelectors } from '../../../../../redux/selectors';
import { Sorting, SortingDirection } from '../types';
import { Run } from '../../../../../api/types';

export type SortMethod = (
  sorting: Sorting,
  { asc, desc }: { asc: (runs: Run[]) => Run[]; desc: (runs: Run[]) => Run[] },
) => void;

interface ServiceInterface {
  toggleSelectRun: (run: Run) => void;
  isRunSelected: (run: Run) => boolean;
  allRunsSelected: (runs: Run[]) => boolean;
  selectRuns: (runs: Run[]) => void;
  unselectRuns: (runs: Run[]) => void;
  sortMethod: SortMethod;
}

export const useService = ({
  activeSorting,
  activeSortingDirection,
  setActiveSortingDirection,
  setActiveSorting,
  setRuns,
  runs,
}: {
  activeSorting: Sorting | null;
  activeSortingDirection: SortingDirection | null;
  setActiveSortingDirection: (arg: SortingDirection | null) => void;
  setActiveSorting: (arg: Sorting | null) => void;
  setRuns: (runs: Run[]) => void;
  runs: Run[];
}): ServiceInterface => {
  const dispatch = useDispatch();

  const setSelectedRunIds = (ids: TId[]) => {
    dispatch(stackPagesActions.setSelectedRunIds({ runIds: ids }));
  };

  const selectedRunIds = useSelector(stackPagesSelectors.selectedRunIds);

  const toggleSelectRun = (run: Run): void => {
    if (selectedRunIds.indexOf(run.id) === -1) {
      setSelectedRunIds([...selectedRunIds, run.id]);
    } else {
      setSelectedRunIds(selectedRunIds.filter((id: TId) => id !== run.id));
    }
  };

  const isRunSelected = (run: Run): boolean => {
    return selectedRunIds.indexOf(run.id) !== -1;
  };

  const selectRuns = (runs: Run[]): void => {
    setSelectedRunIds([...selectedRunIds, ...runs.map((run: Run) => run.id)]);
  };

  const unselectRuns = (runs: Run[]): void => {
    const runIdsToUnselect = runs.map((run: Run) => run.id);

    const newRunIds = selectedRunIds.filter(
      (id: TId) => !runIdsToUnselect.includes(id),
    );

    setSelectedRunIds(newRunIds);
  };

  const allRunsSelected = (runs: Run[]): boolean => {
    return runs.every((run: Run) => isRunSelected(run));
  };

  const sortMethod = (
    sorting: Sorting,
    sort?: { asc: (runs: Run[]) => Run[]; desc: (runs: Run[]) => Run[] },
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
