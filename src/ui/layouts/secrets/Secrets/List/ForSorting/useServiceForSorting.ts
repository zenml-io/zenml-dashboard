import { useDispatch, useSelector } from 'react-redux';
import { stackPagesActions } from '../../../../../../redux/actions';
import { stackPagesSelectors } from '../../../../../../redux/selectors';
import { Sorting, SortingDirection } from './types';
import { Secret } from '../../../../../../api/types';

export type SortMethod = (
  sorting: Sorting,
  {
    asc,
    desc,
  }: {
    asc: (secrets: Secret[]) => Secret[];
    desc: (secrets: Secret[]) => Secret[];
  },
) => void;

interface ServiceInterface {
  toggleSelectRun: (secret: Secret) => void;
  isRunSelected: (secret: Secret) => boolean;
  allRunsSelected: (secrets: Secret[]) => boolean;
  selectRuns: (secrets: Secret[]) => void;
  unselectRuns: (secrets: Secret[]) => void;
  sortMethod: SortMethod;
}

export const useService = ({
  activeSorting,
  activeSortingDirection,
  setActiveSortingDirection,
  setActiveSorting,
  setFilteredSecrets,
  filteredSecrets,
}: {
  activeSorting: Sorting | null;
  activeSortingDirection: SortingDirection | null;
  setActiveSortingDirection: (arg: SortingDirection | null) => void;
  setActiveSorting: (arg: Sorting | null) => void;
  setFilteredSecrets: (secrets: Secret[]) => void;
  filteredSecrets: Secret[];
}): ServiceInterface => {
  const dispatch = useDispatch();

  const setSelectedRunIds = (ids: TId[]) => {
    dispatch(stackPagesActions.setSelectedRunIds({ runIds: ids }));
  };

  const selectedRunIds = useSelector(stackPagesSelectors.selectedRunIds);

  const toggleSelectRun = (secret: Secret): void => {
    if (selectedRunIds.indexOf(secret.id) === -1) {
      setSelectedRunIds([...selectedRunIds, secret.id]);
    } else {
      setSelectedRunIds(selectedRunIds.filter((id: TId) => id !== secret.id));
    }
  };

  const isRunSelected = (secret: Secret): boolean => {
    return selectedRunIds.indexOf(secret.id) !== -1;
  };

  const selectRuns = (secrets: Secret[]): void => {
    setSelectedRunIds([
      ...selectedRunIds,
      ...secrets.map((secret: Secret) => secret.id),
    ]);
  };

  const unselectRuns = (secrets: Secret[]): void => {
    const runIdsToUnselect = secrets.map((secret: Secret) => secret.id);

    const newRunIds = selectedRunIds.filter(
      (id: TId) => !runIdsToUnselect.includes(id),
    );

    setSelectedRunIds(newRunIds);
  };

  const allRunsSelected = (secrets: Secret[]): boolean => {
    return secrets.every((secrets: Secret) => isRunSelected(secrets));
  };

  const sortMethod = (
    sorting: Sorting,
    sort?: {
      asc: (secrets: Secret[]) => Secret[];
      desc: (secrets: Secret[]) => Secret[];
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
