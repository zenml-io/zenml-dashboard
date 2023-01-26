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
    asc: (pipelines: TPipeline[]) => TPipeline[];
    desc: (pipelines: TPipeline[]) => TPipeline[];
  },
) => void;

interface ServiceInterface {
  toggleSelectRun: (pipelines: TPipeline) => void;
  isRunSelected: (pipelines: TPipeline) => boolean;
  allRunsSelected: (pipelines: TPipeline[]) => boolean;
  selectRuns: (pipelines: TPipeline[]) => void;
  unselectRuns: (pipelines: TPipeline[]) => void;
  sortMethod: SortMethod;
}

export const useService = ({
  openPipelineIds,
  setOpenPipelineIds,
  activeSorting,
  activeSortingDirection,
  setActiveSortingDirection,
  setActiveSorting,
  setFilteredPipelines,
  filteredPipelines,
}: {
  openPipelineIds: TId[];
  setOpenPipelineIds: (ids: TId[]) => void;
  activeSorting: Sorting | null;
  activeSortingDirection: SortingDirection | null;
  setActiveSortingDirection: (arg: SortingDirection | null) => void;
  setActiveSorting: (arg: Sorting | null) => void;
  setFilteredPipelines: (pipelines: TPipeline[]) => void;
  filteredPipelines: TPipeline[];
}): ServiceInterface => {
  const dispatch = useDispatch();

  const setSelectedRunIds = (ids: TId[]) => {
    dispatch(stackPagesActions.setSelectedRunIds({ runIds: ids }));
  };

  const selectedRunIds = useSelector(stackPagesSelectors.selectedRunIds);

  const toggleSelectRun = (pipeline: TPipeline): void => {
    if (selectedRunIds.indexOf(pipeline.id) === -1) {
      setSelectedRunIds([...selectedRunIds, pipeline.id]);
    } else {
      setSelectedRunIds(selectedRunIds.filter((id: TId) => id !== pipeline.id));
    }
  };

  const isRunSelected = (pipeline: TPipeline): boolean => {
    return selectedRunIds.indexOf(pipeline.id) !== -1;
  };

  const selectRuns = (pipelines: TPipeline[]): void => {
    setSelectedRunIds([
      ...selectedRunIds,
      ...pipelines.map((pipeline: TPipeline) => pipeline.id),
    ]);
  };

  const unselectRuns = (pipelines: TPipeline[]): void => {
    const runIdsToUnselect = pipelines.map(
      (pipeline: TPipeline) => pipeline.id,
    );

    const newRunIds = selectedRunIds.filter(
      (id: TId) => !runIdsToUnselect.includes(id),
    );

    setSelectedRunIds(newRunIds);
  };

  const allRunsSelected = (pipelines: TPipeline[]): boolean => {
    return pipelines.every((pipeline: TPipeline) => isRunSelected(pipeline));
  };

  const sortMethod = (
    sorting: Sorting,
    sort?: {
      asc: (pipelines: TPipeline[]) => TPipeline[];
      desc: (pipelines: TPipeline[]) => TPipeline[];
    },
  ) => () => {
    if (sorting === activeSorting) {
      if (!!activeSortingDirection && activeSortingDirection === 'ASC') {
        // sort && setFilteredPipelines(sort.desc(filteredPipelines));
        setActiveSortingDirection('DESC');
      } else if (
        !!activeSortingDirection &&
        activeSortingDirection === 'DESC'
      ) {
        // sort && setFilteredPipelines(sort.asc(filteredPipelines));
        setActiveSortingDirection('ASC');
      }
    } else {
      // sort && setFilteredPipelines(sort.desc(filteredPipelines));
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
