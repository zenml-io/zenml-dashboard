/* eslint-disable */

import _ from 'lodash';
import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  connectorSelectors,
  secretPagesSelectors,
} from '../../../../../redux/selectors';

import { Sorting, SortingDirection } from './ForSorting/types';

interface ServiceInterface {
  openConnectorIds: TId[];
  setOpenConnectorIds: (ids: TId[]) => void;
  fetching: boolean;
  setFilteredConnectors: (secrets: any[]) => void;
  filteredConnectors: any[];
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
  filter,
  isExpended,
}: {
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

  const [openConnectorIds, setOpenConnectorIds] = useState<TId[]>([]);
  const [filteredConnectors, setFilteredConnectors] = useState<any[]>([]);

  const fetching = useSelector(secretPagesSelectors.fetching);

  const isValidFilter = filter.map((f) => f.value).join('');

  const connectors = useSelector(connectorSelectors.myConnectors);

  useEffect(() => {
    setFilteredConnectors(connectors as any[]);
  }, [connectors, filter]);

  useEffect(() => {
    if (!isValidFilter && !isExpended) {
      const applySorting =
        activeSortingDirection?.toLowerCase() + ':' + activeSorting;
    }
  });

  const setSelectedRunIds = (runIds: TId[]) => {};

  return {
    filteredConnectors,
    setFilteredConnectors,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
    setSelectedRunIds,
    openConnectorIds,
    setOpenConnectorIds,
    fetching,
  };
};
