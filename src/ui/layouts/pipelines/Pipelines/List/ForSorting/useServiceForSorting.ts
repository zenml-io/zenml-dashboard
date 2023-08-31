import { useDispatch, useSelector } from 'react-redux';
import { stackPagesActions } from '../../../../../../redux/actions';
import { stackPagesSelectors } from '../../../../../../redux/selectors';
import { Sorting, SortingDirection } from './types';
import { Pipeline } from '../../../../../../api/types';

export type SortMethod = (
  sorting: Sorting,
  {
    asc,
    desc,
  }: {
    asc: (pipelines: Pipeline[]) => Pipeline[];
    desc: (pipelines: Pipeline[]) => Pipeline[];
  },
) => void;

interface ServiceInterface {
  toggleSelectRun: (pipelines: Pipeline) => void;
  isRunSelected: (pipelines: Pipeline) => boolean;
  allRunsSelected: (pipelines: Pipeline[]) => boolean;
  selectRuns: (pipelines: Pipeline[]) => void;
  unselectRuns: (pipelines: Pipeline[]) => void;
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

  const toggleSelectRun = (pipeline: Pipeline): void => {
    if (selectedRunIds.indexOf(pipeline.id) === -1) {
      setSelectedRunIds([...selectedRunIds, pipeline.id]);
    } else {
      setSelectedRunIds(selectedRunIds.filter((id: TId) => id !== pipeline.id));
    }
  };

  const isRunSelected = (pipeline: Pipeline): boolean => {
    return selectedRunIds.indexOf(pipeline.id) !== -1;
  };

  const selectRuns = (pipelines: Pipeline[]): void => {
    setSelectedRunIds([
      ...selectedRunIds,
      ...pipelines.map((pipeline: Pipeline) => pipeline.id),
    ]);
  };

  const unselectRuns = (pipelines: Pipeline[]): void => {
    const runIdsToUnselect = pipelines.map((pipeline: Pipeline) => pipeline.id);

    const newRunIds = selectedRunIds.filter(
      (id: TId) => !runIdsToUnselect.includes(id),
    );

    setSelectedRunIds(newRunIds);
  };

  const allRunsSelected = (pipelines: Pipeline[]): boolean => {
    return pipelines.every((pipeline: Pipeline) => isRunSelected(pipeline));
  };

  const sortMethod = (
    sorting: Sorting,
    sort?: {
      asc: (pipelines: Pipeline[]) => Pipeline[];
      desc: (pipelines: Pipeline[]) => Pipeline[];
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
