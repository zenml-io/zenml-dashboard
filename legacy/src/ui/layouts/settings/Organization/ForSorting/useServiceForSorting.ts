import { useDispatch, useSelector } from 'react-redux';
import { stackPagesActions } from '../../../../../redux/actions';
import { stackPagesSelectors } from '../../../../../redux/selectors';
import { Sorting, SortingDirection } from './types';

export type SortMethod = (
  sorting: Sorting,
  {
    asc,
    desc,
  }: {
    asc: (members: TMember[]) => TMember[];
    desc: (members: TMember[]) => TMember[];
  },
) => void;

interface ServiceInterface {
  toggleSelectRun: (members: TMember) => void;
  isRunSelected: (members: TMember) => boolean;
  allRunsSelected: (members: TMember[]) => boolean;
  selectRuns: (members: TMember[]) => void;
  unselectRuns: (members: TMember[]) => void;
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

  const toggleSelectRun = (member: TMember): void => {
    if (selectedRunIds.indexOf(member.id) === -1) {
      setSelectedRunIds([...selectedRunIds, member.id]);
    } else {
      setSelectedRunIds(selectedRunIds.filter((id: TId) => id !== member.id));
    }
  };

  const isRunSelected = (member: TMember): boolean => {
    return selectedRunIds.indexOf(member.id) !== -1;
  };

  const selectRuns = (members: TMember[]): void => {
    setSelectedRunIds([
      ...selectedRunIds,
      ...members.map((member: TMember) => member.id),
    ]);
  };

  const unselectRuns = (members: TMember[]): void => {
    const runIdsToUnselect = members.map((member: TMember) => member.id);

    const newRunIds = selectedRunIds.filter(
      (id: TId) => !runIdsToUnselect.includes(id),
    );

    setSelectedRunIds(newRunIds);
  };

  const allRunsSelected = (members: TMember[]): boolean => {
    return members.every((member: TMember) => isRunSelected(member));
  };

  const sortMethod = (
    sorting: Sorting,
    sort?: {
      asc: (members: TMember[]) => TMember[];
      desc: (members: TMember[]) => TMember[];
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
