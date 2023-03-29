/* eslint-disable */

import _ from 'lodash';
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  secretPagesActions,
  secretsActions,
} from '../../../../../redux/actions';
import {
  workspaceSelectors,
  // secretPagesSelectors,
  secretPagesSelectors,
  // secretSelectors,
  secretSelectors,
} from '../../../../../redux/selectors';
import { getFilteredDataForTable } from '../../../../../utils/tableFilters';
import { Sorting, SortingDirection } from './ForSorting/types';

interface ServiceInterface {
  openSecretIds: TId[];
  setOpenSecretIds: (ids: TId[]) => void;
  fetching: boolean;
  setFilteredSecrets: (secrets: any[]) => void;
  filteredSecrets: any[];
  activeSorting: Sorting | null;
  setActiveSorting: (arg: Sorting | null) => void;
  activeSortingDirection: SortingDirection | null;
  setActiveSortingDirection: (arg: SortingDirection | null) => void;
  setSelectedRunIds: (ids: TId[]) => void;
}

interface filterValue {
  label: string;
  type: string;
  value: string;
}
export const useService = ({
  // secretComponentId,
  filter,
  isExpended,
}: {
  // secretComponentId?: any;
  isExpended?: any;
  filter: {
    column: filterValue;
    type: filterValue;
    value: string;
  }[];
}): ServiceInterface => {
  const [activeSorting, setActiveSorting] = React.useState<Sorting | null>(
    'created',
  );
  const [
    activeSortingDirection,
    setActiveSortingDirection,
  ] = React.useState<SortingDirection | null>('DESC');
  const dispatch = useDispatch();

  const [openSecretIds, setOpenSecretIds] = useState<TId[]>([]);
  const [filteredSecrets, setFilteredSecrets] = useState<any[]>([]);

  const fetching = useSelector(secretPagesSelectors.fetching);

  const secrets = useSelector(secretSelectors.mySecrets);
  const secretsPaginated = useSelector(secretSelectors.mySecretsPaginated);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const isValidFilter = filter.map((f) => f.value).join('');

  useEffect(() => {
    setFilteredSecrets(secrets as any[]);
  }, [secrets, filter]);

  useEffect(() => {
    if (!isValidFilter && !isExpended) {
      const applySorting =
        activeSortingDirection?.toLowerCase() + ':' + activeSorting;
      const intervalId = setInterval(() => {
        dispatch(
          secretsActions.getMy({
            // component_id: secretComponentId,
            sort_by: applySorting ? applySorting : 'created',
            logical_operator: 'and',
            workspace: selectedWorkspace,
            page: secretsPaginated.page,
            size: secretsPaginated.size,
          }),
        );
      }, 5000);

      return () => clearInterval(intervalId); //This is important
    }
  });

  const setSelectedRunIds = (runIds: TId[]) => {
    // dispatch(secretPagesActions.setSelectedRunIds({ runIds }));
  };

  return {
    filteredSecrets,
    setFilteredSecrets,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
    setSelectedRunIds,
    openSecretIds,
    setOpenSecretIds,
    fetching,
  };
};
