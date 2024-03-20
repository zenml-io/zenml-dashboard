import { useDispatch, useSelector } from 'react-redux';
import { stackPagesActions } from '../../../../../../redux/actions';
import { stackPagesSelectors } from '../../../../../../redux/selectors';
import { Sorting, SortingDirection } from './types';
import { ServiceConnector } from '../../../../../../api/types';

export type SortMethod = (
  sorting: Sorting,
  {
    asc,
    desc,
  }: {
    asc: (connnectors: ServiceConnector[]) => ServiceConnector[];
    desc: (connnectors: ServiceConnector[]) => ServiceConnector[];
  },
) => void;

interface ServiceInterface {
  toggleSelectRun: (connnectors: ServiceConnector) => void;
  isRunSelected: (connnectors: ServiceConnector) => boolean;
  allRunsSelected: (connnectors: ServiceConnector[]) => boolean;
  selectRuns: (connnectors: ServiceConnector[]) => void;
  unselectRuns: (connnectors: ServiceConnector[]) => void;
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
  setFilteredConnectors: (connnectors: ServiceConnector[]) => void;
  filteredConnectors: ServiceConnector[];
}): ServiceInterface => {
  const dispatch = useDispatch();

  const setSelectedRunIds = (ids: TId[]) => {
    dispatch(stackPagesActions.setSelectedRunIds({ runIds: ids }));
  };

  const selectedRunIds = useSelector(stackPagesSelectors.selectedRunIds);

  const toggleSelectRun = (connector: ServiceConnector): void => {
    if (selectedRunIds.indexOf(connector.id) === -1) {
      setSelectedRunIds([...selectedRunIds, connector.id]);
    } else {
      setSelectedRunIds(
        selectedRunIds.filter((id: TId) => id !== connector.id),
      );
    }
  };

  const isRunSelected = (connector: ServiceConnector): boolean => {
    return selectedRunIds.indexOf(connector.id) !== -1;
  };

  const selectRuns = (connectors: ServiceConnector[]): void => {
    setSelectedRunIds([
      ...selectedRunIds,
      ...connectors.map((connector: ServiceConnector) => connector.id),
    ]);
  };

  const unselectRuns = (connectors: ServiceConnector[]): void => {
    const runIdsToUnselect = connectors.map(
      (connector: ServiceConnector) => connector.id,
    );

    const newRunIds = selectedRunIds.filter(
      (id: TId) => !runIdsToUnselect.includes(id),
    );

    setSelectedRunIds(newRunIds);
  };

  const allRunsSelected = (connectors: ServiceConnector[]): boolean => {
    return connectors.every((connector: ServiceConnector) =>
      isRunSelected(connector),
    );
  };

  const sortMethod = (
    sorting: Sorting,
    sort?: {
      asc: (connectors: ServiceConnector[]) => ServiceConnector[];
      desc: (connectors: ServiceConnector[]) => ServiceConnector[];
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
