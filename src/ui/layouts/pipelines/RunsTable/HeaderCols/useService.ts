import { useDispatch, useSelector } from 'react-redux';
import { pipelinePagesActions } from '../../../../../redux/actions';
import { pipelinePagesSelectors } from '../../../../../redux/selectors';
import { Sorting, SortingDirection } from '../types';

export type SortMethod = (
  sorting: Sorting,
  {
    asc,
    desc,
  }: { asc: (runs: TRun[]) => TRun[]; desc: (runs: TRun[]) => TRun[] },
) => void;

interface ServiceInterface {
  toggleSelectRun: (run: TRun) => void;
  isRunSelected: (run: TRun) => boolean;
  selectRuns: (runs: TRun[]) => void;
  unselectRuns: (runs: TRun[]) => void;
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
  setRuns: (runs: TRun[]) => void;
  runs: TRun[];
}): ServiceInterface => {
  const dispatch = useDispatch();

  const setSelectedRunIds = (ids: TId[]) => {
    dispatch(pipelinePagesActions.setSelectedRunIds({ runIds: ids }));
  };

  const selectedRunIds = useSelector(pipelinePagesSelectors.selectedRunIds);

  const toggleSelectRun = (run: TRun): void => {
    if (selectedRunIds.indexOf(run.id) === -1) {
      setSelectedRunIds([...selectedRunIds, run.id]);
    } else {
      setSelectedRunIds(selectedRunIds.filter((id: TId) => id !== run.id));
    }
  };

  const isRunSelected = (run: TRun): boolean => {
    return selectedRunIds.indexOf(run.id) !== -1;
  };

  const selectRuns = (runs: TRun[]): void => {
    setSelectedRunIds([...selectedRunIds, ...runs.map((run: TRun) => run.id)]);
  };

  const unselectRuns = (runs: TRun[]): void => {
    const runIdsToUnselect = runs.map((run: TRun) => run.id);

    const newRunIds = selectedRunIds.filter(
      (id: TId) => !runIdsToUnselect.includes(id),
    );

    setSelectedRunIds(newRunIds);
  };

  const sortMethod = (
    sorting: Sorting,
    sort?: { asc: (runs: TRun[]) => TRun[]; desc: (runs: TRun[]) => TRun[] },
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
    sortMethod,
  };
};
